package permutations;

public class Test {

	public static void main(String[] args) throws Exception {
		int i;
		String s;
		Permutations p = new Permutations();
		for (PermutationType type : PermutationType.values()) {
			p.init(2, 4, type);
			System.out.format("combinations=%2d ", p.number());
			s = "";
			for (int[] a : p) {
				i = 0;
				s += "{";
				for (int v : a) {
					if (i != 0) {
						s += " ";
					}
					s += v;
					i++;
				}
				s += "}";
			}
			System.out.println(s);
		}
	}
}
