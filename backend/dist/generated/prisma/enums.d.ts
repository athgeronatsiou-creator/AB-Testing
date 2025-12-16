export declare const TestStatus: {
    readonly DRAFT: "DRAFT";
    readonly PUBLISHED: "PUBLISHED";
    readonly CLOSED: "CLOSED";
};
export type TestStatus = (typeof TestStatus)[keyof typeof TestStatus];
export declare const VoteChoice: {
    readonly A: "A";
    readonly B: "B";
};
export type VoteChoice = (typeof VoteChoice)[keyof typeof VoteChoice];
export declare const EventType: {
    readonly VOTE: "VOTE";
    readonly VIEW: "VIEW";
};
export type EventType = (typeof EventType)[keyof typeof EventType];
//# sourceMappingURL=enums.d.ts.map