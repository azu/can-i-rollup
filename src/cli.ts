import meow from "meow";
import { canIRollup } from "./can-i-rollup";

export const cli = meow(
    `
    Usage
      $ can-i-rollup src/index.js
 
    Options
      --verbose          Show verbose information
 
    Examples
      $ can-i-rollup src/index.js
      $ echo $?
      # 1 or 0
      $ can-i-rollup --verbose src/index.js
      # Output build 
`,
    {
        flags: {
            verbose: {
                type: "boolean",
                default: false
            }
        },
        autoHelp: true,
        autoVersion: true
    }
);

export const run = async (
    input = cli.input,
    flags = cli.flags
): Promise<{ exitStatus: number; stdout: string | null; stderr: Error | null }> => {
    if (!input[0]) {
        throw cli.showHelp(1);
    }
    try {
        const result = await canIRollup({
            input: input[0]
        });
        return {
            exitStatus: 0,
            stderr: null,
            stdout: flags.verbose ? JSON.stringify(result.code.output) : null
        };
    } catch (error) {
        return {
            exitStatus: 1,
            stderr: error,
            stdout: null
        };
    }
};
