const downloadComponent = () => {
	return {
		chaptersLimit: 1000,
		loading: false,
		addingToDownload: false,
		searchInput: '',
		data: {},
		chapters: [],
		langChoice: 'All',
		groupChoice: 'All',
		chapterRange: '',
		volumeRange: '',

		get languages() {
			const set = new Set();
			if (this.data.chapters) {
				this.data.chapters.forEach(chp => {
					set.add(chp.language);
				});
			}
			const ary = [...set].sort();
			ary.unshift('All');
			return ary;
		},

		get groups() {
			const set = new Set();
			if (this.data.chapters) {
				this.data.chapters.forEach(chp => {
					Object.keys(chp.groups).forEach(g => {
						set.add(g);
					});
				});
			}
			const ary = [...set].sort();
			ary.unshift('All');
			return ary;
		},

		init() {
			const tableObserver = new MutationObserver(() => {
				console.log('table mutated');
				$("#selectable").selectable({
					filter: 'tr'
				});
			});
			tableObserver.observe($('table').get(0), {
				childList: true,
				subtree: true
			});
		},
		filtersUpdated() {
			if (!this.data.chapters)
				this.chapters = [];
			const filters = {
				chapter: this.parseRange(this.chapterRange),
				volume: this.parseRange(this.volumeRange),
				lang: this.langChoice,
				group: this.groupChoice
			};
			console.log('filters:', filters);
			let _chapters = this.data.chapters.slice();
			Object.entries(filters).forEach(([k, v]) => {
				if (v === 'All') return;
				if (k === 'group') {
					_chapters = _chapters.filter(c => {
						const unescaped_groups = Object.entries(c.groups).map(([g, id]) => this.unescapeHTML(g));
						return unescaped_groups.indexOf(v) >= 0;
					});
					return;
				}
				if (k === 'lang') {
					_chapters = _chapters.filter(c => c.language === v);
					return;
				}
				const lb = parseFloat(v[0]);
				const ub = parseFloat(v[1]);
				if (isNaN(lb) && isNaN(ub)) return;
				_chapters = _chapters.filter(c => {
					const val = parseFloat(c[k]);
					if (isNaN(val)) return false;
					if (isNaN(lb))
						return val <= ub;
					else if (isNaN(ub))
						return val >= lb;
					else
						return val >= lb && val <= ub;
				});
			});
			console.log('filtered chapters:', _chapters);
			this.chapters = _chapters;
		},
		search() {
			if (this.loading || this.searchInput === '') return;
			this.loading = true;
			this.data = {};

			var int_id = -1;
			try {
				const path = new URL(this.searchInput).pathname;
				const match = /\/(?:title|manga)\/([0-9]+)/.exec(path);
				int_id = parseInt(match[1]);
			} catch (e) {
				int_id = parseInt(this.searchInput);
			}
			if (int_id <= 0 || isNaN(int_id)) {
				alert('danger', 'Please make sure you are using a valid manga ID or manga URL from Mangadex.');
				this.loading = false;
				return;
			}

			$.getJSON(`${base_url}api/admin/mangadex/manga/${int_id}`)
				.done((data) => {
					if (data.error) {
						alert('danger', 'Failed to get manga info. Error: ' + data.error);
						return;
					}

					this.data = data;
					this.chapters = data.chapters;
				})
				.fail((jqXHR, status) => {
					alert('danger', `Failed to get manga info. Error: [${jqXHR.status}] ${jqXHR.statusText}`);
				})
				.always(() => {
					this.loading = false;
				});

		},

		parseRange(str) {
			const regex = /^[\t ]*(?:(?:(<|<=|>|>=)[\t ]*([0-9]+))|(?:([0-9]+))|(?:([0-9]+)[\t ]*-[\t ]*([0-9]+))|(?:[\t ]*))[\t ]*$/m;
			const matches = str.match(regex);
			var num;

			if (!matches) {
				return [null, null];
			} else if (typeof matches[1] !== 'undefined' && typeof matches[2] !== 'undefined') {
				// e.g., <= 30
				num = parseInt(matches[2]);
				if (isNaN(num)) {
					return [null, null];
				}
				switch (matches[1]) {
					case '<':
						return [null, num - 1];
					case '<=':
						return [null, num];
					case '>':
						return [num + 1, null];
					case '>=':
						return [num, null];
				}
			} else if (typeof matches[3] !== 'undefined') {
				// a single number
				num = parseInt(matches[3]);
				if (isNaN(num)) {
					return [null, null];
				}
				return [num, num];
			} else if (typeof matches[4] !== 'undefined' && typeof matches[5] !== 'undefined') {
				// e.g., 10 - 23
				num = parseInt(matches[4]);
				const n2 = parseInt(matches[5]);
				if (isNaN(num) || isNaN(n2) || num > n2) {
					return [null, null];
				}
				return [num, n2];
			} else {
				// empty or space only
				return [null, null];
			}
		},

		unescapeHTML(str) {
			var elt = document.createElement("span");
			elt.innerHTML = str;
			return elt.innerText;
		},

		selectAll() {
			$('tbody > tr').each((i, e) => {
				$(e).addClass('ui-selected');
			});
		},

		clearSelection() {
			$('tbody > tr').each((i, e) => {
				$(e).removeClass('ui-selected');
			});
		},

		download() {
			const selected = $('tbody > tr.ui-selected');
			if (selected.length === 0) return;
			UIkit.modal.confirm(`Download ${selected.length} selected chapters?`).then(() => {
				const ids = selected.map((i, e) => {
					return parseInt($(e).find('td').first().text());
				}).get();
				const chapters = this.chapters.filter(c => ids.indexOf(c.id) >= 0);
				console.log(ids);
				this.addingToDownload = true;
				$.ajax({
						type: 'POST',
						url: `${base_url}api/admin/mangadex/download`,
						data: JSON.stringify({
							chapters: chapters
						}),
						contentType: "application/json",
						dataType: 'json'
					})
					.done(data => {
						console.log(data);
						if (data.error) {
							alert('danger', `Failed to add chapters to the download queue. Error: ${data.error}`);
							return;
						}
						const successCount = parseInt(data.success);
						const failCount = parseInt(data.fail);
						UIkit.modal.confirm(`${successCount} of ${successCount + failCount} chapters added to the download queue. Proceed to the download manager?`).then(() => {
							window.location.href = base_url + 'admin/downloads';
						});
					})
					.fail((jqXHR, status) => {
						alert('danger', `Failed to add chapters to the download queue. Error: [${jqXHR.status}] ${jqXHR.statusText}`);
					})
					.always(() => {
						this.addingToDownload = false;
					});
			});
		}
	};
};
