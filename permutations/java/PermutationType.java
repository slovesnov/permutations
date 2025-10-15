package permutations;

/*
 * PermutationType
 * PERMUTATIONS_WITHOUT_REPLACEMENTS k-permutations of n without replacements. Number of combinations equals n!/(n-k)!
 * PERMUTATIONS_WITH_REPLACEMENTS k-permutations of n with replacements. Number of combinations equals n^k
 * COMBINATION k-combination of n items. Number of combinations equals n!/(n-k)!/k!
*/
public enum PermutationType {
	PERMUTATIONS_WITHOUT_REPLACEMENTS, PERMUTATIONS_WITH_REPLACEMENTS, COMBINATION
}
