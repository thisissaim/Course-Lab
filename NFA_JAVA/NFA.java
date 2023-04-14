import java.util.Scanner;
import java.io.File;
import java.io.*;

public class NFA {
    private static final int MAX_FINAL_STATES = 100;
    private static final String INPUT_FILE = "input.txt";

    public static void main(String[] args) throws FileNotFoundException {

        int states;
        int symbols;
        int num_transition;
        int initial_state;
        int final_states;
        int[] terminal_state = new int[MAX_FINAL_STATES];
        int[] present = new int[100];
        int[] next = new int[100];
        boolean end = false;

        try {
            Scanner file = new Scanner(new File(INPUT_FILE));
            states = file.nextInt();
            symbols = file.nextInt();
            num_transition = file.nextInt();

            int[][][] nfa = new int[states][symbols][states];
            for (int i = 0; i < num_transition; i++) {
                int q0, input, q1;
                q0 = file.nextInt();
                input = file.nextInt();
                q1 = file.nextInt();
                nfa[q0][input][q1] = 1;// marking 1 for existing path
            }

            initial_state = file.nextInt();
            final_states = file.nextInt();
            for (int i = 0; i < final_states; i++) {
                terminal_state[i] = file.nextInt();
            }
            System.out.println();
            System.out.println("(Q) : " + states);
            System.out.println("(\u03A3) : " + symbols);
            System.out.println("(q0): " + initial_state);
            System.out.println("(F) : " + final_states);

            file.close();

            System.out.print("\n Terminal States : ");
            for (int i = 0; i < final_states; i++) {
                System.out.print(terminal_state[i] + " ");
            }

            System.out.println();
            for (int i = 0; i < states; i++) {
                System.out.println(" \n Transition for State Q(" + i + ") : ");
                for (int j = 0; j < symbols; j++) {
                    System.out.print(" \n (\u03A3) : " + j + " : ");
                    for (int k = 0; k < states; k++) {
                        if (nfa[i][j][k] == 1) {
                            System.out.print(" Y ");
                        } else {
                            System.out.print(" N ");
                        }
                    }
                    System.out.print(" ");
                }
                System.out.println();
            }

            while (true) {
                Scanner sc = new Scanner(System.in);

                System.out.print("\nEnter length of input string : ");
                int str_len = sc.nextInt();

                if (str_len <= 0) {
                    System.out.println("Invalid input length. Try again.");
                    continue;
                }

                int[] str = new int[str_len];
                System.out.print("\nEnter input string : ");
                for (int i = 0; i < str_len; i++) {
                    str[i] = sc.nextInt();
                }
                System.out.println();
                int present_size = 1;
                present[0] = initial_state;// first state in present state will be the initial state

                for (int i = 0; i < str_len; i++) {// iterate through each symbol
                    int next_size = 0;
                    for (int j = 0; j < present_size; j++) {
                        int temp = present[j];
                        for (int k = 0; k < states; k++) {
                            if (nfa[temp][str[i]][k] == 1) {// check if transition exists
                                next[next_size++] = k;// add resulting state to next[] array
                            }
                        }
                    }
                    System.out.println(" Symbol Read (\u03A3) : " + str[i]);
                    System.out.print(" Present State :  ");
                    for (int j = 0; j < present_size; j++) {
                        System.out.print(present[j] + " ");
                    }
                    System.out.print("\n Next State :  ");
                    for (int j = 0; j < next_size; j++) {
                        System.out.print(next[j] + " ");
                    }
                    System.out.println(
                            "\n-------------------------------------------------------------------------------");

                    System.out.println();
                    present_size = next_size;
                    for (int j = 0; j < present_size; j++) {
                        present[j] = next[j];
                    }
                }

                for (int i = 0; i < present_size; i++) {
                    for (int j = 0; j < final_states; j++) {
                        if (present[i] == terminal_state[j]) {
                            end = true;
                            System.out
                                    .print("NFA on the above input has reached it's final state -> " + present[i]);
                            break;
                        }
                    }
                }
                System.out.println();
                if (end) {
                    System.out.println("String input is accepted");
                } else {
                    System.out.println("String input is rejected");
                }
            }
        } catch (FileNotFoundException e) {
            System.err.println("File not found: " + e.getMessage());
        } finally {
        }
    }
}