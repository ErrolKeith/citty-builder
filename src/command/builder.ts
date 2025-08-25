import {
  ArgDef,
  ArgsDef,
  CommandContext,
  CommandDef,
  CommandMeta,
  defineCommand,
  Resolvable,
  SubCommandsDef,
} from "citty";

export type CittyDef<T extends CittyArgs> = CommandDef<T>;
export type CittyMeta = Resolvable<CommandMeta>;
export type CittyArgDef = ArgDef;
export interface CittyArgs extends ArgsDef {
  [x: string]: CittyArgDef;
}
export type CittyBuilderArgs<T> = Resolvable<T>;
export type CittySubcommandsDef = SubCommandsDef;
export type CittySubCommands = Resolvable<CittySubcommandsDef>;
export type CittyContextCallback<T extends CittyArgs> = (
  context: CommandContext<T>
) => any | Promise<any>;

export class CittyBuilder<T extends CittyArgs> {
  private meta: CittyMeta | undefined;
  private args: CittyBuilderArgs<T> | undefined;
  private subCommands: CittySubCommands | undefined;
  private setup: CittyContextCallback<T> | undefined;
  private cleanup: CittyContextCallback<T> | undefined;
  private run: CittyContextCallback<T> | undefined;

  constructor() {}

  public withArgs(args: T) {
    this.args = args;
    return this;
  }

  public withMeta(meta: CittyMeta) {
    this.meta = meta;
    return this;
  }

  public withSubCommands(subCommands: CittySubCommands) {
    this.subCommands = subCommands;
    return this;
  }

  public withSetupCallback(callback: CittyContextCallback<T>) {
    this.setup = callback;
    return this;
  }

  public withCleanupCallback(callback: CittyContextCallback<T>) {
    this.cleanup = callback;
    return this;
  }

  public withRunner(callback: CittyContextCallback<T>) {
    this.run = callback;
    return this;
  }

  public getCitty(): CittyDef<T> {
    return defineCommand({
      meta: this.meta,
      args: this.args,
      subCommands: this.subCommands,
      setup: this.setup,
      cleanup: this.cleanup,
      run: this.run,
    });
  }
}
