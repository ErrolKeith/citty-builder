import {
  ArgsDef,
  CommandContext,
  CommandDef,
  CommandMeta,
  defineCommand,
  Resolvable,
  SubCommandsDef,
} from "citty";

export class CittyBuilder<T extends ArgsDef> {
  private meta: Resolvable<CommandMeta> | undefined;
  private args: Resolvable<T> | undefined;
  private subCommands: Resolvable<SubCommandsDef> | undefined;
  private setup:
    | ((context: CommandContext<T>) => any | Promise<any>)
    | undefined;
  private cleanup:
    | ((context: CommandContext<T>) => any | Promise<any>)
    | undefined;
  private run:
    | ((context: CommandContext<T>) => any | Promise<any>)
    | undefined;

  constructor() {}

  public withArgs(args: T) {
    this.args = args;
    return this;
  }

  public withMeta(meta: Resolvable<CommandMeta>) {
    this.meta = meta;
    return this;
  }

  public withSubCommands(subCommands: Resolvable<SubCommandsDef>) {
    this.subCommands = subCommands;
    return this;
  }

  public withSetupCallback(
    callback: (context: CommandContext<T>) => any | Promise<any>
  ) {
    this.setup = callback;
    return this;
  }

  public withCleanupCallback(
    callback: (context: CommandContext<T>) => any | Promise<any>
  ) {
    this.cleanup = callback;
    return this;
  }

  public withRunner(
    callback: (context: CommandContext<T>) => any | Promise<any>
  ) {
    this.run = callback;
    return this;
  }

  public getCitty(): CommandDef<T> {
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
