export declare type BettererLogger<T extends Array<unknown>> = (...args: T) => BettererLoggerResult;

export declare type BettererLoggerCodeInfo = {
    message: string;
    filePath: string;
    fileText: string;
    line: number;
    column: number;
    length: number;
};

export declare type BettererLoggerDiffOptions = DiffOptions;

export declare type BettererLoggerResult = {
    type: BettererLoggerMessageType;
    messages: Array<string>;
    log(): void;
};

export declare type BettererLoggerResults = Array<BettererLoggerResult>;

export declare const BettererTask: FC<BettererTaskProps>;

export declare type BettererTaskColour = typeof ForegroundColor;

export declare type BettererTaskContext = {
    name: string;
    run: (logger: BettererTaskLogger) => Promise<BettererTaskStatusMessage | string | void>;
};

export declare type BettererTaskError = Error & {
    details: string;
    message: string;
};

export declare type BettererTaskLogger = {
    status: BettererTaskUpdate;
    debug: BettererTaskUpdate;
    info: BettererTaskUpdate;
    warn: BettererTaskUpdate;
};

export declare type BettererTaskProps = {
    context: BettererTaskContext;
};

export declare const BettererTasks: FC<BettererTasksProps>;

export declare type BettererTasksProps = {
    name: string;
};

export declare type BettererTaskStatusMessage = [indicator: string, colour: BettererTaskColour, message: string];

export declare type BettererTaskStatusMessages = ReadonlyArray<BettererTaskStatusMessage>;

export declare type BettererTaskUpdate = (status: string) => void;

export declare const brΔ: BettererLogger<string[]>;

export declare const codeΔ: (codeInfo: BettererLoggerCodeInfo) => {
    type: BettererLoggerMessageType;
    messages: string[];
    log(): void;
};

export declare const debugΔ: BettererLogger<string[]>;

export declare const diffΔ: (expected: unknown, result: unknown, options?: DiffOptions | undefined) => {
    type: BettererLoggerMessageType;
    messages: string[];
    log(): void;
};

export declare const errorΔ: BettererLogger<string[]>;

export declare const infoΔ: BettererLogger<string[]>;

export declare const logoΔ: () => {
    type: BettererLoggerMessageType;
    messages: string[];
    log(): void;
};

export declare function logΔ(...results: BettererLoggerResults): void;

export declare function muteΔ(): void;

export declare const rawΔ: BettererLogger<string[]>;

export declare const successΔ: BettererLogger<string[]>;

export declare function unmuteΔ(): void;

export declare const warnΔ: BettererLogger<string[]>;
