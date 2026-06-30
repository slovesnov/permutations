class Permutations {
	static get PERMUTATIONS_WITHOUT_REPLACEMENTS() { return 0; }
	static get PERMUTATIONS_WITH_REPLACEMENTS() { return 1; }
	static get COMBINATION() { return 2; }
	static get Types() {
		return [Permutations.PERMUTATIONS_WITHOUT_REPLACEMENTS,
		Permutations.PERMUTATIONS_WITH_REPLACEMENTS, Permutations.COMBINATION]
	}

	constructor(k = 1, n = 1, type = Permutations.COMBINATION) {
		this.init(k, n, type)
	}

	number() {
		let i;
		let r = 1;
		if (this.isWithPeplacements()) {
			for (i = 0; i < this.k; i++) {
				r *= this.n;
			}
		}
		else if (this.isCombination()) {
			/* for big n,k
			 * C(n,k)=n*C(n-1,k-1)/k
			 * C(n,k)=n*C(n-1,k-1)/k=(n/k)*(n-1/k-1)...(n-k+1/1)C(n-k,0); C(n-k,0)=1
			 */
			for (i = 1; i <= this.k; i++) {
				r *= this.n - this.k + i;
				r /= i;
			}
		}
		else {
			for (i = this.n - this.k + 1; i <= this.n; i++) {
				r *= i;
			}
		}
		return r;
	}

	init(k = 1, n = 1, type = Permutations.COMBINATION) {
		if (k < 0 || n < 0 || !Number.isInteger(k) || !Number.isInteger(n)) {
			alert("permutations. error n and k should be nonnegative integer numbers "
				+ " n=" + n + " k=" + k);
			return false;
		}
		//set type pefore check
		this.type = type;
		if (!this.isWithPeplacements() && n < k) {
			alert("permutations. error n<k");
			return false;
		}
		this.n = n;
		this.k = k;

		this.i = new Array(this.k);
		this.a = new Array(this.n);

		this.reset();
		return true;
	}

	reset() {
		if (this.k != 0) {
			//init indexes
			this.index = 0;
			this.i[0] = -1;
			this.add();
		}
	}

	add() {
		let j = this.index;
		let m, l;
		this.i[j]++;
		for (j++; j < this.k; j++) {
			this.i[j] = this.isCombination() ? this.i[j - 1] + 1 : 0;
		}

		if (this.isWithoutPeplacements()) {
			for (j = 0; j < this.n; j++) {
				this.a[j] = j;
			}
			for (j = 0; j < this.k; j++) {
				m = j + this.i[j];
				l = this.a[m];
				for (; j != this.k - 1 && m > j; m--) {
					this.a[m] = this.a[m - 1];
				}
				this.a[j] = l;
			}
		}
	}

	next() {
		let l, j;
		for (j = this.k - 1; j >= 0; j--) {
			if (this.isWithoutPeplacements()) {
				l = j;
			} else if (this.isWithPeplacements()) {
				l = 0;
			} else {
				l = this.k - 1 - j;
			}
			if (this.n - 1 != this.i[j] + l) {
				break;
			}
		}
		this.index = j;

		if (this.index == -1) {
			return false;
		}
		this.add();
		return true;
	}

	getK() {
		return this.k;
	}

	getN() {
		return this.n;
	}

	getIndexesInner() {
		return this.isWithoutPeplacements() ? this.a : this.i;
	}

	getIndexes() {
		return this.isWithoutPeplacements() ? this.a.slice(0, this.k) : this.i.slice();
	}

	getIndex(i) {
		return this.getIndexesInner()[i];
	}

	isWithoutPeplacements() {
		return this.type == Permutations.PERMUTATIONS_WITHOUT_REPLACEMENTS
	}

	isWithPeplacements() {
		return this.type == Permutations.PERMUTATIONS_WITH_REPLACEMENTS
	}

	isCombination() {
		return this.type == Permutations.COMBINATION
	}

	forEach(f) {
		this.reset();
		do {
			f(this.getIndexes())
		} while (this.next())
	}

	[Symbol.iterator]() {
		let o = this
		let f = true
		return {
			next() {
				let r;
				if (f) {
					o.reset()
					r = f = false;
				} else {
					r = !o.next();
				}
				return {
					value: o.getIndexes(),
					done: r
				}
			}
		}
	}

}