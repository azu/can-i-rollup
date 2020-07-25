import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { rollup } from "rollup";

export type canIRollupOptions = {
    input: string;
};
export const canIRollup = async (options: canIRollupOptions) => {
    const output = await rollup({
        input: options.input,
        plugins: [commonjs(), resolve(), json()]
    });
    const code = await output.generate({ format: "esm" });
    return {
        status: "ok",
        code: code
    };
};
