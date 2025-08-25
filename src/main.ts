import { CittyBuilder } from "./command/builder";
import type {
  CittyArgDef,
  CittyBuilderArgs,
  CittyContextCallback,
  CittyArgs,
  CittyDef,
  CittyMeta,
  CittySubCommands,
  CittySubcommandsDef,
} from "./command/builder";
import type {
  ArgsDef,
  CommandContext,
  CommandDef,
  SubCommandsDef,
  RunMainOptions,
} from "citty";
import { runMain } from "citty";

export { CittyBuilder, runMain };
export type {
  CittyDef,
  CittyMeta,
  CittySubCommands,
  CittySubcommandsDef,
  CittyArgDef,
  CittyArgs,
  CittyBuilderArgs,
  CittyContextCallback,
  ArgsDef,
  CommandContext,
  CommandDef,
  RunMainOptions,
  SubCommandsDef,
};
