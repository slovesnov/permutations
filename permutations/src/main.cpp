#include <cstdio>
#include <string>

#include "permutations/Permutations.h"

int main() {
	int i;

	Permutations p(2, 4, Permutations::PERMUTATIONS_WITHOUT_REPLACEMENTS);
	printf("combinations=%2d ", p.number());
	for (auto &v : p) {//v is std::vector<int>
		i = 0;
		printf("{");
		for (int a : v) {
			printf("%s%d", i ? " " : "", a);
			i++;
		}
		printf("}");
	}
	printf("\n");

	std::string s;
	p.init(2, 4, Permutations::PERMUTATIONS_WITH_REPLACEMENTS);
	printf("combinations=%2d ", p.number());
	auto f = [&s](auto &v) {
		s += '{';
		int i = 0;
		for (auto &a : v) {
			s += (i ? " " : "") + std::to_string(a);
			i++;
		}
		s += '}';
	};
	p.forEach(f);
	printf("%s\n", s.c_str());

	p.init(2, 4, Permutations::COMBINATION);
	printf("combinations=%2d ", p.number());
	do {
		printf("{");
		for (i = 0; i < p.getK(); i++) {
			printf("%s%d", i ? " " : "", p.getIndex(i));
		}
		printf("}");
	} while (p.next());
	printf("\n");

}

void f(){
	int i;
	Permutations::Type type[] = {
			Permutations::PERMUTATIONS_WITHOUT_REPLACEMENTS,
			Permutations::PERMUTATIONS_WITH_REPLACEMENTS,
			Permutations::COMBINATION };

	Permutations p;
	for (auto t : type) {
		p.init(2, 4, t);
		printf("combinations=%2d ", p.number());
		do {
			for (i = 0; i < p.getK(); i++) {
				printf("%c%d", i == 0 ? '{' : ' ', p.getIndex(i));
			}
			printf("}");
		} while (p.next());
		printf("\n");
	}

	for (auto t : type) {
		p.init(2, 4, t);
		printf("combinations=%2d ", p.number());
		for (auto& c : p) {
			i = 0;
			for (int v : c) {
				printf("%c%d", i++ ? ' ' : '{', v);
			}
			printf("}");
		}
		printf("\n");
	}

}
