import { CittyBuilder } from "./command/builder";
import type {
  ArgsDef,
  CommandContext,
  CommandDef,
  CommandMeta,
  SubCommandsDef,
  RunMainOptions,
} from "citty";
import { runMain } from "citty";

export { CittyBuilder, runMain };
export type {
  ArgsDef,
  CommandContext,
  CommandDef,
  CommandMeta,
  RunMainOptions,
  SubCommandsDef,
};
