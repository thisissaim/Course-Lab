//Mohammad Saim
//20COB070

import java.util.Scanner;

public class LCS {
    public static int dp[][];

    public enum Direction {// for table directions
        LEFT,
        UP,
        DIAG
    }

    public static String lcs(String x, String y)
    {
        int m = x.length();
        int n = y.length();
        Direction[][] from = new Direction[m + 1][n + 1];// Construct direction table of +1 size
        dp = new int[m + 1][n + 1];// Construct dp table of +1 size

        // initialize dp base case -> Fill starting row/col with zeroes
        for (int i = 0; i <= m; i++)
        {
            dp[i][0] = 0;
        }
        for (int j = 0; j <= n; j++)
        {
            dp[0][j] = 0;
        }

        // fill up dp table -> Algo
        
        System.out.println("\n\n Tabulating with directions:  \\ for diagonal , ^ for upwards, < for leftwards\n\n");

        for (int i = 1; i <= m; i++) {
            System.out.println();
            for (int j = 1; j <= n; j++) {
                if (x.charAt(i - 1) == y.charAt(j - 1)) // If characters at that particluar indices match then
                {
                    dp[i][j] = dp[i - 1][j - 1] + 1; // 1 + left diagonal element
                    from[i][j] = Direction.DIAG;
                    System.out.print("  \\  ");
                    System.out.print(dp[i][j]);

                } else if (dp[i - 1][j] >= dp[i][j - 1]) // If no match and element in prev row (just above) is greater
                {
                    dp[i][j] = dp[i - 1][j];// copy that element val.
                    from[i][j] = Direction.UP;
                    System.out.print("  ^  ");
                    System.out.print(dp[i][j]);

                } else // If no match and element in prev column (just left) is greater
                {
                    dp[i][j] = dp[i][j - 1];
                    from[i][j] = Direction.LEFT;
                    System.out.print("  <  ");
                    System.out.print(dp[i][j]);
                }
            }
        }

        // Print final table
        System.out.println();
        System.out.println("\nFinal Tabulation : ");
        for (int i = 0; i <= m; i++) {
            System.out.println();
            for (int j = 0; j <= n; j++) {
                System.out.print(dp[i][j] + " ");
            }
        }

        // backtrace to get LCS
        String result = "";
        System.out.println("\n\nIntermediate Subsequence : ");
        int i = m, j = n;// Place i and j at last element position
        while (i > 0 && j > 0) {
            switch (from[i][j]) {
                case DIAG:
                    result = x.substring(i - 1, i) + result;
                    System.out.println(result);
                    i -= 1;
                    j -= 1;
                    break;
                case UP:
                    i -= 1;
                    break;
                case LEFT:
                    j -= 1;
                    break;
            }
        }
        System.out.println("\n\nLength of LCS =   " + result.length());
        return result;
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        System.out.println("Input a sequence of characters");
        String sequence = sc.next();
        System.out.println("Input another sequence of characters");
        String sequence2 = sc.next();

        System.out.println("\nLCS of x and y is: " + lcs(sequence, sequence2));

        sc.close();
    }
}