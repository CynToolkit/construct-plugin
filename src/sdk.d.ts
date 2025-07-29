declare global {
    /** The SDK version available at runtime. */
    const sdk: "v1" | "v2";

    interface WebSocketClient {
        connect(): Promise<WebSocket>;
        send(message: any): void;
        sendAndWaitForResponse(message: any): Promise<any>;
        close(): void;
        on(event: string, listener: (data: any) => void): void;
        off(event: string, listener: (data: any) => void): void;
    }

    var pipelab: {
        ws: WebSocketClient;
    };
}

type MyAction<ACE_CATEGORIES extends string, NAME extends string, PARAMS> = import("c3ide2-types").Action<ACE_CATEGORIES> & {
    forward: `_${NAME}`;
    params: PARAMS
}
type MyCondition<ACE_CATEGORIES extends string, NAME extends string, PARAMS> = import("c3ide2-types").Condition<ACE_CATEGORIES> & {
    forward: `_${NAME}`;
    params: PARAMS
}
type MyExpression<ACE_CATEGORIES extends string, NAME extends string, PARAMS> = import("c3ide2-types").Expression<ACE_CATEGORIES> & {
    forward: `_${NAME}`;
    params: PARAMS
}

type Categories = 'general' | 'window' | 'filesystem' | 'file-dialogs' | 'command-line' | 'steam' | 'discord'

type Config<T extends string> = import("c3ide2-types").Plugin<T>;

// TODO:
type ActionParam = Required<Config<string>["Acts"][string]>["params"][number];

type C3Plugin = typeof import("./pluginConfig.js").default;

declare const cndsSymbol: unique symbol;
type OpaqueCnds = { readonly [cndsSymbol]: "Cnds" };

declare const actsSymbol: unique symbol;
type OpaqueActs = { readonly [actsSymbol]: "Acts" };

declare const expsSymbol: unique symbol;
type OpaqueExps = { readonly [expsSymbol]: "Exps" };

type Reverser<T extends Record<PropertyKey, PropertyKey>> = {
    [P in keyof T as T[P]]: P;
};

type ActsKeys = keyof C3Plugin["Acts"];
type ActsAssoc = {
    [key in ActsKeys]: C3Plugin["Acts"][key]["forward"];
};
type ActsAssocReversed = Reverser<ActsAssoc>;
// if any, a declaration is missing "_forward"
type Acts = C3Plugin["Acts"][ActsKeys]["forward"];

type CndsKeys = keyof C3Plugin["Cnds"];
type CndsAssoc = {
    [key in CndsKeys]: C3Plugin["Cnds"][key]["forward"];
};
type CndsAssocReversed = Reverser<CndsAssoc>;
// if any, a declaration is missing "_forward"
type Cnds = C3Plugin["Cnds"][CndsKeys]["forward"];

type ExpsKeys = keyof C3Plugin["Exps"];
type ExpsAssoc = {
    [key in ExpsKeys]: C3Plugin["Exps"][key]["forward"];
};
type ExpsAssocReversed = Reverser<ExpsAssoc>;
// if any, a declaration is missing "_forward"
type Exps = C3Plugin["Exps"][ExpsKeys]["forward"];

type Awaitable<T> = T | PromiseLike<T>;

type _A = C3Plugin["Acts"][ActsAssocReversed['_RenameFile']]['params']

type GetActsParams<T extends Acts> =
    C3Plugin["Acts"][ActsAssocReversed[T]] extends { params: Array<ActionParam> }
    ? C3Plugin["Acts"][ActsAssocReversed[T]]["params"]
    : never;

type GetCndsParams<T extends Cnds> =
    C3Plugin["Cnds"][CndsAssocReversed[T]] extends { params: Array<ActionParam> }
    ? C3Plugin["Cnds"][CndsAssocReversed[T]]["params"]
    : never;

type GetExpsParams<T extends Exps> =
    C3Plugin["Exps"][ExpsAssocReversed[T]] extends { params: Array<ActionParam> }
    ? C3Plugin["Exps"][ExpsAssocReversed[T]]["params"]
    : never;

type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

// TODO: ActionParam['type']
interface ActionParamBase {
    id: string;
    name: string;
    desc: string;
    type:
    | "string"
    | "number"
    | "any"
    | "boolean"
    | "cmp"
    | "object"
    | "objectname"
    | "layer"
    | "layout"
    | "keyb"
    | "instancevar"
    | "instancevarbool"
    | "eventvar"
    | "eventvarbool"
    | "animation"
    | "objinstancevar";
    initialValue?: any;
    allowedPluginIds?: string[];
}

interface ActionParamCombo extends Omit<ActionParamBase, "type"> {
    type: "combo";
    items: Array<{ [key: string]: string }>;
}

type ActionParam = ActionParamBase | ActionParamCombo;

type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (
    x: infer I
) => void
    ? I
    : never;

type BuildUnion<
    N extends number,
    Acc extends number[] = []
> = Acc['length'] extends N
    ? Acc[number]
    : BuildUnion<N, [...Acc, Acc['length']]>;

// ArrayUnion accepts an array type and returns the union 0 | 1 | ... | N.
type ArrayUnion<T extends readonly unknown[]> = BuildUnion<T['length']>;

type ActionParamToType<T extends ActionParam> = any /* T["type"] extends "string"
    ? string
    : T["type"] extends "number"
    ? number
    : T["type"] extends "boolean"
    ? boolean
    : T["type"] extends "object"
    ? IObjectClass
    : T["type"] extends "combo"
    ? // ? keyof UnionToIntersection<DeepWriteable<T['items'][number]>>
    ArrayUnion<T['items']>
    : never; */

type ReturnTypeToType<T extends "string" | "number"> = T extends "string"
    ? string
    : T extends "number"
    ? number
    : never;

type A = GetActsParams<'_ShowDevTools'>
type B = GetActsParams<'_ShowDevTools'>["0"]
type C = ActionParamToType<GetActsParams<'_ShowDevTools'>["0"]>
type D = ActionParamToType<GetActsParams<'_ShowDevTools'>["1"]>
type E = ActionParamToType<GetActsParams<'_ShowDevTools'>["2"]>

// support only 10 typed parametes
// TODO: find a way to support more
// references:
//     array to tuple
//     rest function parameters
type DynamicMethodsActsParentClass = {
    [acts in Acts]: (
        param1: ActionParamToType<GetActsParams<acts>["0"]>,
        param2: ActionParamToType<GetActsParams<acts>["1"]>,
        param3: ActionParamToType<GetActsParams<acts>["2"]>,
        param4: ActionParamToType<GetActsParams<acts>["3"]>,
        param5: ActionParamToType<GetActsParams<acts>["4"]>,
        param6: ActionParamToType<GetActsParams<acts>["5"]>,
        param7: ActionParamToType<GetActsParams<acts>["6"]>,
        param8: ActionParamToType<GetActsParams<acts>["7"]>,
        param9: ActionParamToType<GetActsParams<acts>["8"]>,
        param10: ActionParamToType<GetActsParams<acts>["9"]>
    ) => C3Plugin["Acts"][ActsAssocReversed[acts]]["isAsync"] extends true
        ? Promise<void>
        : void;
};

type DynamicMethodsCndsParentClass = {
    [cnds in Cnds]: (
        param1: ActionParamToType<GetCndsParams<cnds>["0"]>,
        param2: ActionParamToType<GetCndsParams<cnds>["1"]>,
        param3: ActionParamToType<GetCndsParams<cnds>["2"]>,
        param4: ActionParamToType<GetCndsParams<cnds>["3"]>,
        param5: ActionParamToType<GetCndsParams<cnds>["4"]>,
        param6: ActionParamToType<GetCndsParams<cnds>["5"]>,
        param7: ActionParamToType<GetCndsParams<cnds>["6"]>,
        param8: ActionParamToType<GetCndsParams<cnds>["7"]>,
        param9: ActionParamToType<GetCndsParams<cnds>["8"]>,
        param10: ActionParamToType<GetCndsParams<cnds>["9"]>
    ) => boolean;
};

type DynamicMethodsExpsParentClass = {
    [exps in Exps]: (
        param1: ActionParamToType<GetExpsParams<exps>["0"]>,
        param2: ActionParamToType<GetExpsParams<exps>["1"]>,
        param3: ActionParamToType<GetExpsParams<exps>["2"]>,
        param4: ActionParamToType<GetExpsParams<exps>["3"]>,
        param5: ActionParamToType<GetExpsParams<exps>["4"]>,
        param6: ActionParamToType<GetExpsParams<exps>["5"]>,
        param7: ActionParamToType<GetExpsParams<exps>["6"]>,
        param8: ActionParamToType<GetExpsParams<exps>["7"]>,
        param9: ActionParamToType<GetExpsParams<exps>["8"]>,
        param10: ActionParamToType<GetExpsParams<exps>["9"]>
    ) => ReturnTypeToType<
        C3Plugin["Exps"][ExpsAssocReversed[exps]]["returnType"]
    >;
};

interface SDKInstanceDataObject {
    GetArrayBufferReadOnly(): ArrayBuffer;
}

type StaticMethodsParentClass = {
    Trigger(trigger: OpaqueCnds): void;
    TriggerAsync(trigger: OpaqueCnds): Promise<void>;

    _triggerAsync(trigger: OpaqueCnds): Promise<void>;
    _trigger(trigger: OpaqueCnds): void;

    _getInitProperties(): {};

    _inst: any;

    runtime: IRuntime
};

type ParentClass = DynamicMethodsActsParentClass &
    DynamicMethodsCndsParentClass &
    DynamicMethodsExpsParentClass &
    ISDKInstanceBase_ &
    // my overrides
    {
        _trigger(method: OpaqueCnds): void;
        _triggerAsync(method: OpaqueCnds): Promise<void>;
    }
    ;

interface C3 {
    Plugins: {
        [pluginId in C3Plugin["id"]]: {
            Cnds: {
                [cnds in keyof C3Plugin["Cnds"]]: OpaqueCnds;
            };
            Acts: {
                [acts in keyof C3Plugin["Acts"]]: OpaqueActs;
            };
            Exps: {
                [exps in keyof C3Plugin["Exps"]]: OpaqueExps;
            };
        };
    };
}

export type GetInstanceJSFn = (
    parentClass: new (...args: any[]) => ParentClass,
    addonTriggers: string[],
    C3: C3
) => new (...args: any[]) => ParentClass;

export type IsFullScreenState = ActionParamToType<GetCndsParams<'_IsFullScreen'>['0']>

// export interface ACEGeneratorParam<NAME extends string, PARAMS extends MyAction<Categories, NAME>['params']> {
export interface ACEGeneratorParam<NAME extends string, PARAMS> {
    category: MyAction<Categories, NAME>['category'];
    highlight: MyAction<Categories, NAME>['highlight'];
    deprecated: MyAction<Categories, NAME>['deprecated'];
    listName: MyAction<Categories, NAME>['listName'];
    displayText: MyAction<Categories, NAME>['displayText'];
    description: MyAction<Categories, NAME>['description'];
    params: MyAction<Categories, NAME, PARAMS>['params'];
}

// export type ACEGeneratorResult<DATA extends { name: string }, NAME extends DATA['name']> = {
export type ACEGeneratorResult<NAME extends string, DATA> = {
// export type ACEGeneratorResult<NAME extends string> = {
    actions: {
        [index in `${NAME}Sync` | `${NAME}`]: MyAction<Categories, `${NAME}Sync` | `${NAME}`, DATA['conditions'][index]['params']>;
    }
    conditions: {
        [index in `On${NAME}Success` | `OnAny${NAME}Success` | `On${NAME}Error` | `OnAny${NAME}Error`]: MyCondition<Categories, `On${NAME}Success` | `OnAny${NAME}Success` | `On${NAME}Error` | `OnAny${NAME}Error`, DATA['conditions'][index]['params']>;
    }
    expressions: {
        [index in `${NAME}Error` | `${NAME}Result`]: MyExpression<Categories, `${NAME}Error` | `${NAME}Result`, DATA['conditions'][index]['params']>;
    }
    test: {
        [index in `A${NAME}A`]: MyCondition<Categories, `A${NAME}A`, DATA['conditions'][index]['params']>;
    }
}
export type ACEGenerator<NAME extends string> = (data: ACEGeneratorParam<NAME>) => ACEGeneratorResult<NAME>

export interface PostFullscreenState {
    state: 0 | 1
}