import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Test
 *
 */
export type TestModel = runtime.Types.Result.DefaultSelection<Prisma.$TestPayload>;
export type AggregateTest = {
    _count: TestCountAggregateOutputType | null;
    _min: TestMinAggregateOutputType | null;
    _max: TestMaxAggregateOutputType | null;
};
export type TestMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    title: string | null;
    descA: string | null;
    descB: string | null;
    imageAUrl: string | null;
    imageBUrl: string | null;
    status: $Enums.TestStatus | null;
    createdAt: Date | null;
    publishedAt: Date | null;
};
export type TestMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    title: string | null;
    descA: string | null;
    descB: string | null;
    imageAUrl: string | null;
    imageBUrl: string | null;
    status: $Enums.TestStatus | null;
    createdAt: Date | null;
    publishedAt: Date | null;
};
export type TestCountAggregateOutputType = {
    id: number;
    userId: number;
    title: number;
    descA: number;
    descB: number;
    imageAUrl: number;
    imageBUrl: number;
    status: number;
    createdAt: number;
    publishedAt: number;
    _all: number;
};
export type TestMinAggregateInputType = {
    id?: true;
    userId?: true;
    title?: true;
    descA?: true;
    descB?: true;
    imageAUrl?: true;
    imageBUrl?: true;
    status?: true;
    createdAt?: true;
    publishedAt?: true;
};
export type TestMaxAggregateInputType = {
    id?: true;
    userId?: true;
    title?: true;
    descA?: true;
    descB?: true;
    imageAUrl?: true;
    imageBUrl?: true;
    status?: true;
    createdAt?: true;
    publishedAt?: true;
};
export type TestCountAggregateInputType = {
    id?: true;
    userId?: true;
    title?: true;
    descA?: true;
    descB?: true;
    imageAUrl?: true;
    imageBUrl?: true;
    status?: true;
    createdAt?: true;
    publishedAt?: true;
    _all?: true;
};
export type TestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Test to aggregate.
     */
    where?: Prisma.TestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tests to fetch.
     */
    orderBy?: Prisma.TestOrderByWithRelationInput | Prisma.TestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.TestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Tests
    **/
    _count?: true | TestCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: TestMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: TestMaxAggregateInputType;
};
export type GetTestAggregateType<T extends TestAggregateArgs> = {
    [P in keyof T & keyof AggregateTest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTest[P]> : Prisma.GetScalarType<T[P], AggregateTest[P]>;
};
export type TestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TestWhereInput;
    orderBy?: Prisma.TestOrderByWithAggregationInput | Prisma.TestOrderByWithAggregationInput[];
    by: Prisma.TestScalarFieldEnum[] | Prisma.TestScalarFieldEnum;
    having?: Prisma.TestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TestCountAggregateInputType | true;
    _min?: TestMinAggregateInputType;
    _max?: TestMaxAggregateInputType;
};
export type TestGroupByOutputType = {
    id: string;
    userId: string;
    title: string;
    descA: string | null;
    descB: string | null;
    imageAUrl: string;
    imageBUrl: string;
    status: $Enums.TestStatus;
    createdAt: Date;
    publishedAt: Date | null;
    _count: TestCountAggregateOutputType | null;
    _min: TestMinAggregateOutputType | null;
    _max: TestMaxAggregateOutputType | null;
};
type GetTestGroupByPayload<T extends TestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TestGroupByOutputType[P]>;
}>>;
export type TestWhereInput = {
    AND?: Prisma.TestWhereInput | Prisma.TestWhereInput[];
    OR?: Prisma.TestWhereInput[];
    NOT?: Prisma.TestWhereInput | Prisma.TestWhereInput[];
    id?: Prisma.StringFilter<"Test"> | string;
    userId?: Prisma.StringFilter<"Test"> | string;
    title?: Prisma.StringFilter<"Test"> | string;
    descA?: Prisma.StringNullableFilter<"Test"> | string | null;
    descB?: Prisma.StringNullableFilter<"Test"> | string | null;
    imageAUrl?: Prisma.StringFilter<"Test"> | string;
    imageBUrl?: Prisma.StringFilter<"Test"> | string;
    status?: Prisma.EnumTestStatusFilter<"Test"> | $Enums.TestStatus;
    createdAt?: Prisma.DateTimeFilter<"Test"> | Date | string;
    publishedAt?: Prisma.DateTimeNullableFilter<"Test"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    votes?: Prisma.VoteListRelationFilter;
    events?: Prisma.EventListRelationFilter;
};
export type TestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    descA?: Prisma.SortOrderInput | Prisma.SortOrder;
    descB?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageAUrl?: Prisma.SortOrder;
    imageBUrl?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    votes?: Prisma.VoteOrderByRelationAggregateInput;
    events?: Prisma.EventOrderByRelationAggregateInput;
};
export type TestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TestWhereInput | Prisma.TestWhereInput[];
    OR?: Prisma.TestWhereInput[];
    NOT?: Prisma.TestWhereInput | Prisma.TestWhereInput[];
    userId?: Prisma.StringFilter<"Test"> | string;
    title?: Prisma.StringFilter<"Test"> | string;
    descA?: Prisma.StringNullableFilter<"Test"> | string | null;
    descB?: Prisma.StringNullableFilter<"Test"> | string | null;
    imageAUrl?: Prisma.StringFilter<"Test"> | string;
    imageBUrl?: Prisma.StringFilter<"Test"> | string;
    status?: Prisma.EnumTestStatusFilter<"Test"> | $Enums.TestStatus;
    createdAt?: Prisma.DateTimeFilter<"Test"> | Date | string;
    publishedAt?: Prisma.DateTimeNullableFilter<"Test"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    votes?: Prisma.VoteListRelationFilter;
    events?: Prisma.EventListRelationFilter;
}, "id">;
export type TestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    descA?: Prisma.SortOrderInput | Prisma.SortOrder;
    descB?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageAUrl?: Prisma.SortOrder;
    imageBUrl?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.TestCountOrderByAggregateInput;
    _max?: Prisma.TestMaxOrderByAggregateInput;
    _min?: Prisma.TestMinOrderByAggregateInput;
};
export type TestScalarWhereWithAggregatesInput = {
    AND?: Prisma.TestScalarWhereWithAggregatesInput | Prisma.TestScalarWhereWithAggregatesInput[];
    OR?: Prisma.TestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TestScalarWhereWithAggregatesInput | Prisma.TestScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Test"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Test"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Test"> | string;
    descA?: Prisma.StringNullableWithAggregatesFilter<"Test"> | string | null;
    descB?: Prisma.StringNullableWithAggregatesFilter<"Test"> | string | null;
    imageAUrl?: Prisma.StringWithAggregatesFilter<"Test"> | string;
    imageBUrl?: Prisma.StringWithAggregatesFilter<"Test"> | string;
    status?: Prisma.EnumTestStatusWithAggregatesFilter<"Test"> | $Enums.TestStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Test"> | Date | string;
    publishedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Test"> | Date | string | null;
};
export type TestCreateInput = {
    id?: string;
    title: string;
    descA?: string | null;
    descB?: string | null;
    imageAUrl: string;
    imageBUrl: string;
    status?: $Enums.TestStatus;
    createdAt?: Date | string;
    publishedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutTestsInput;
    votes?: Prisma.VoteCreateNestedManyWithoutTestInput;
    events?: Prisma.EventCreateNestedManyWithoutTestInput;
};
export type TestUncheckedCreateInput = {
    id?: string;
    userId: string;
    title: string;
    descA?: string | null;
    descB?: string | null;
    imageAUrl: string;
    imageBUrl: string;
    status?: $Enums.TestStatus;
    createdAt?: Date | string;
    publishedAt?: Date | string | null;
    votes?: Prisma.VoteUncheckedCreateNestedManyWithoutTestInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutTestInput;
};
export type TestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descA?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descB?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageAUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    imageBUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTestStatusFieldUpdateOperationsInput | $Enums.TestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutTestsNestedInput;
    votes?: Prisma.VoteUpdateManyWithoutTestNestedInput;
    events?: Prisma.EventUpdateManyWithoutTestNestedInput;
};
export type TestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descA?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descB?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageAUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    imageBUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTestStatusFieldUpdateOperationsInput | $Enums.TestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    votes?: Prisma.VoteUncheckedUpdateManyWithoutTestNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutTestNestedInput;
};
export type TestCreateManyInput = {
    id?: string;
    userId: string;
    title: string;
    descA?: string | null;
    descB?: string | null;
    imageAUrl: string;
    imageBUrl: string;
    status?: $Enums.TestStatus;
    createdAt?: Date | string;
    publishedAt?: Date | string | null;
};
export type TestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descA?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descB?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageAUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    imageBUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTestStatusFieldUpdateOperationsInput | $Enums.TestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type TestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descA?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descB?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageAUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    imageBUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTestStatusFieldUpdateOperationsInput | $Enums.TestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type TestListRelationFilter = {
    every?: Prisma.TestWhereInput;
    some?: Prisma.TestWhereInput;
    none?: Prisma.TestWhereInput;
};
export type TestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    descA?: Prisma.SortOrder;
    descB?: Prisma.SortOrder;
    imageAUrl?: Prisma.SortOrder;
    imageBUrl?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
};
export type TestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    descA?: Prisma.SortOrder;
    descB?: Prisma.SortOrder;
    imageAUrl?: Prisma.SortOrder;
    imageBUrl?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
};
export type TestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    descA?: Prisma.SortOrder;
    descB?: Prisma.SortOrder;
    imageAUrl?: Prisma.SortOrder;
    imageBUrl?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
};
export type TestScalarRelationFilter = {
    is?: Prisma.TestWhereInput;
    isNot?: Prisma.TestWhereInput;
};
export type TestCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TestCreateWithoutUserInput, Prisma.TestUncheckedCreateWithoutUserInput> | Prisma.TestCreateWithoutUserInput[] | Prisma.TestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TestCreateOrConnectWithoutUserInput | Prisma.TestCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TestCreateManyUserInputEnvelope;
    connect?: Prisma.TestWhereUniqueInput | Prisma.TestWhereUniqueInput[];
};
export type TestUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TestCreateWithoutUserInput, Prisma.TestUncheckedCreateWithoutUserInput> | Prisma.TestCreateWithoutUserInput[] | Prisma.TestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TestCreateOrConnectWithoutUserInput | Prisma.TestCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TestCreateManyUserInputEnvelope;
    connect?: Prisma.TestWhereUniqueInput | Prisma.TestWhereUniqueInput[];
};
export type TestUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TestCreateWithoutUserInput, Prisma.TestUncheckedCreateWithoutUserInput> | Prisma.TestCreateWithoutUserInput[] | Prisma.TestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TestCreateOrConnectWithoutUserInput | Prisma.TestCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TestUpsertWithWhereUniqueWithoutUserInput | Prisma.TestUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TestCreateManyUserInputEnvelope;
    set?: Prisma.TestWhereUniqueInput | Prisma.TestWhereUniqueInput[];
    disconnect?: Prisma.TestWhereUniqueInput | Prisma.TestWhereUniqueInput[];
    delete?: Prisma.TestWhereUniqueInput | Prisma.TestWhereUniqueInput[];
    connect?: Prisma.TestWhereUniqueInput | Prisma.TestWhereUniqueInput[];
    update?: Prisma.TestUpdateWithWhereUniqueWithoutUserInput | Prisma.TestUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TestUpdateManyWithWhereWithoutUserInput | Prisma.TestUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TestScalarWhereInput | Prisma.TestScalarWhereInput[];
};
export type TestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TestCreateWithoutUserInput, Prisma.TestUncheckedCreateWithoutUserInput> | Prisma.TestCreateWithoutUserInput[] | Prisma.TestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TestCreateOrConnectWithoutUserInput | Prisma.TestCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TestUpsertWithWhereUniqueWithoutUserInput | Prisma.TestUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TestCreateManyUserInputEnvelope;
    set?: Prisma.TestWhereUniqueInput | Prisma.TestWhereUniqueInput[];
    disconnect?: Prisma.TestWhereUniqueInput | Prisma.TestWhereUniqueInput[];
    delete?: Prisma.TestWhereUniqueInput | Prisma.TestWhereUniqueInput[];
    connect?: Prisma.TestWhereUniqueInput | Prisma.TestWhereUniqueInput[];
    update?: Prisma.TestUpdateWithWhereUniqueWithoutUserInput | Prisma.TestUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TestUpdateManyWithWhereWithoutUserInput | Prisma.TestUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TestScalarWhereInput | Prisma.TestScalarWhereInput[];
};
export type EnumTestStatusFieldUpdateOperationsInput = {
    set?: $Enums.TestStatus;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type TestCreateNestedOneWithoutVotesInput = {
    create?: Prisma.XOR<Prisma.TestCreateWithoutVotesInput, Prisma.TestUncheckedCreateWithoutVotesInput>;
    connectOrCreate?: Prisma.TestCreateOrConnectWithoutVotesInput;
    connect?: Prisma.TestWhereUniqueInput;
};
export type TestUpdateOneRequiredWithoutVotesNestedInput = {
    create?: Prisma.XOR<Prisma.TestCreateWithoutVotesInput, Prisma.TestUncheckedCreateWithoutVotesInput>;
    connectOrCreate?: Prisma.TestCreateOrConnectWithoutVotesInput;
    upsert?: Prisma.TestUpsertWithoutVotesInput;
    connect?: Prisma.TestWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TestUpdateToOneWithWhereWithoutVotesInput, Prisma.TestUpdateWithoutVotesInput>, Prisma.TestUncheckedUpdateWithoutVotesInput>;
};
export type TestCreateNestedOneWithoutEventsInput = {
    create?: Prisma.XOR<Prisma.TestCreateWithoutEventsInput, Prisma.TestUncheckedCreateWithoutEventsInput>;
    connectOrCreate?: Prisma.TestCreateOrConnectWithoutEventsInput;
    connect?: Prisma.TestWhereUniqueInput;
};
export type TestUpdateOneRequiredWithoutEventsNestedInput = {
    create?: Prisma.XOR<Prisma.TestCreateWithoutEventsInput, Prisma.TestUncheckedCreateWithoutEventsInput>;
    connectOrCreate?: Prisma.TestCreateOrConnectWithoutEventsInput;
    upsert?: Prisma.TestUpsertWithoutEventsInput;
    connect?: Prisma.TestWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TestUpdateToOneWithWhereWithoutEventsInput, Prisma.TestUpdateWithoutEventsInput>, Prisma.TestUncheckedUpdateWithoutEventsInput>;
};
export type TestCreateWithoutUserInput = {
    id?: string;
    title: string;
    descA?: string | null;
    descB?: string | null;
    imageAUrl: string;
    imageBUrl: string;
    status?: $Enums.TestStatus;
    createdAt?: Date | string;
    publishedAt?: Date | string | null;
    votes?: Prisma.VoteCreateNestedManyWithoutTestInput;
    events?: Prisma.EventCreateNestedManyWithoutTestInput;
};
export type TestUncheckedCreateWithoutUserInput = {
    id?: string;
    title: string;
    descA?: string | null;
    descB?: string | null;
    imageAUrl: string;
    imageBUrl: string;
    status?: $Enums.TestStatus;
    createdAt?: Date | string;
    publishedAt?: Date | string | null;
    votes?: Prisma.VoteUncheckedCreateNestedManyWithoutTestInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutTestInput;
};
export type TestCreateOrConnectWithoutUserInput = {
    where: Prisma.TestWhereUniqueInput;
    create: Prisma.XOR<Prisma.TestCreateWithoutUserInput, Prisma.TestUncheckedCreateWithoutUserInput>;
};
export type TestCreateManyUserInputEnvelope = {
    data: Prisma.TestCreateManyUserInput | Prisma.TestCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type TestUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.TestWhereUniqueInput;
    update: Prisma.XOR<Prisma.TestUpdateWithoutUserInput, Prisma.TestUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.TestCreateWithoutUserInput, Prisma.TestUncheckedCreateWithoutUserInput>;
};
export type TestUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.TestWhereUniqueInput;
    data: Prisma.XOR<Prisma.TestUpdateWithoutUserInput, Prisma.TestUncheckedUpdateWithoutUserInput>;
};
export type TestUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.TestScalarWhereInput;
    data: Prisma.XOR<Prisma.TestUpdateManyMutationInput, Prisma.TestUncheckedUpdateManyWithoutUserInput>;
};
export type TestScalarWhereInput = {
    AND?: Prisma.TestScalarWhereInput | Prisma.TestScalarWhereInput[];
    OR?: Prisma.TestScalarWhereInput[];
    NOT?: Prisma.TestScalarWhereInput | Prisma.TestScalarWhereInput[];
    id?: Prisma.StringFilter<"Test"> | string;
    userId?: Prisma.StringFilter<"Test"> | string;
    title?: Prisma.StringFilter<"Test"> | string;
    descA?: Prisma.StringNullableFilter<"Test"> | string | null;
    descB?: Prisma.StringNullableFilter<"Test"> | string | null;
    imageAUrl?: Prisma.StringFilter<"Test"> | string;
    imageBUrl?: Prisma.StringFilter<"Test"> | string;
    status?: Prisma.EnumTestStatusFilter<"Test"> | $Enums.TestStatus;
    createdAt?: Prisma.DateTimeFilter<"Test"> | Date | string;
    publishedAt?: Prisma.DateTimeNullableFilter<"Test"> | Date | string | null;
};
export type TestCreateWithoutVotesInput = {
    id?: string;
    title: string;
    descA?: string | null;
    descB?: string | null;
    imageAUrl: string;
    imageBUrl: string;
    status?: $Enums.TestStatus;
    createdAt?: Date | string;
    publishedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutTestsInput;
    events?: Prisma.EventCreateNestedManyWithoutTestInput;
};
export type TestUncheckedCreateWithoutVotesInput = {
    id?: string;
    userId: string;
    title: string;
    descA?: string | null;
    descB?: string | null;
    imageAUrl: string;
    imageBUrl: string;
    status?: $Enums.TestStatus;
    createdAt?: Date | string;
    publishedAt?: Date | string | null;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutTestInput;
};
export type TestCreateOrConnectWithoutVotesInput = {
    where: Prisma.TestWhereUniqueInput;
    create: Prisma.XOR<Prisma.TestCreateWithoutVotesInput, Prisma.TestUncheckedCreateWithoutVotesInput>;
};
export type TestUpsertWithoutVotesInput = {
    update: Prisma.XOR<Prisma.TestUpdateWithoutVotesInput, Prisma.TestUncheckedUpdateWithoutVotesInput>;
    create: Prisma.XOR<Prisma.TestCreateWithoutVotesInput, Prisma.TestUncheckedCreateWithoutVotesInput>;
    where?: Prisma.TestWhereInput;
};
export type TestUpdateToOneWithWhereWithoutVotesInput = {
    where?: Prisma.TestWhereInput;
    data: Prisma.XOR<Prisma.TestUpdateWithoutVotesInput, Prisma.TestUncheckedUpdateWithoutVotesInput>;
};
export type TestUpdateWithoutVotesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descA?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descB?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageAUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    imageBUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTestStatusFieldUpdateOperationsInput | $Enums.TestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutTestsNestedInput;
    events?: Prisma.EventUpdateManyWithoutTestNestedInput;
};
export type TestUncheckedUpdateWithoutVotesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descA?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descB?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageAUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    imageBUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTestStatusFieldUpdateOperationsInput | $Enums.TestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    events?: Prisma.EventUncheckedUpdateManyWithoutTestNestedInput;
};
export type TestCreateWithoutEventsInput = {
    id?: string;
    title: string;
    descA?: string | null;
    descB?: string | null;
    imageAUrl: string;
    imageBUrl: string;
    status?: $Enums.TestStatus;
    createdAt?: Date | string;
    publishedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutTestsInput;
    votes?: Prisma.VoteCreateNestedManyWithoutTestInput;
};
export type TestUncheckedCreateWithoutEventsInput = {
    id?: string;
    userId: string;
    title: string;
    descA?: string | null;
    descB?: string | null;
    imageAUrl: string;
    imageBUrl: string;
    status?: $Enums.TestStatus;
    createdAt?: Date | string;
    publishedAt?: Date | string | null;
    votes?: Prisma.VoteUncheckedCreateNestedManyWithoutTestInput;
};
export type TestCreateOrConnectWithoutEventsInput = {
    where: Prisma.TestWhereUniqueInput;
    create: Prisma.XOR<Prisma.TestCreateWithoutEventsInput, Prisma.TestUncheckedCreateWithoutEventsInput>;
};
export type TestUpsertWithoutEventsInput = {
    update: Prisma.XOR<Prisma.TestUpdateWithoutEventsInput, Prisma.TestUncheckedUpdateWithoutEventsInput>;
    create: Prisma.XOR<Prisma.TestCreateWithoutEventsInput, Prisma.TestUncheckedCreateWithoutEventsInput>;
    where?: Prisma.TestWhereInput;
};
export type TestUpdateToOneWithWhereWithoutEventsInput = {
    where?: Prisma.TestWhereInput;
    data: Prisma.XOR<Prisma.TestUpdateWithoutEventsInput, Prisma.TestUncheckedUpdateWithoutEventsInput>;
};
export type TestUpdateWithoutEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descA?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descB?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageAUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    imageBUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTestStatusFieldUpdateOperationsInput | $Enums.TestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutTestsNestedInput;
    votes?: Prisma.VoteUpdateManyWithoutTestNestedInput;
};
export type TestUncheckedUpdateWithoutEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descA?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descB?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageAUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    imageBUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTestStatusFieldUpdateOperationsInput | $Enums.TestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    votes?: Prisma.VoteUncheckedUpdateManyWithoutTestNestedInput;
};
export type TestCreateManyUserInput = {
    id?: string;
    title: string;
    descA?: string | null;
    descB?: string | null;
    imageAUrl: string;
    imageBUrl: string;
    status?: $Enums.TestStatus;
    createdAt?: Date | string;
    publishedAt?: Date | string | null;
};
export type TestUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descA?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descB?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageAUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    imageBUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTestStatusFieldUpdateOperationsInput | $Enums.TestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    votes?: Prisma.VoteUpdateManyWithoutTestNestedInput;
    events?: Prisma.EventUpdateManyWithoutTestNestedInput;
};
export type TestUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descA?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descB?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageAUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    imageBUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTestStatusFieldUpdateOperationsInput | $Enums.TestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    votes?: Prisma.VoteUncheckedUpdateManyWithoutTestNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutTestNestedInput;
};
export type TestUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descA?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    descB?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageAUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    imageBUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTestStatusFieldUpdateOperationsInput | $Enums.TestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type TestCountOutputType
 */
export type TestCountOutputType = {
    votes: number;
    events: number;
};
export type TestCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    votes?: boolean | TestCountOutputTypeCountVotesArgs;
    events?: boolean | TestCountOutputTypeCountEventsArgs;
};
/**
 * TestCountOutputType without action
 */
export type TestCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCountOutputType
     */
    select?: Prisma.TestCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * TestCountOutputType without action
 */
export type TestCountOutputTypeCountVotesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VoteWhereInput;
};
/**
 * TestCountOutputType without action
 */
export type TestCountOutputTypeCountEventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EventWhereInput;
};
export type TestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    title?: boolean;
    descA?: boolean;
    descB?: boolean;
    imageAUrl?: boolean;
    imageBUrl?: boolean;
    status?: boolean;
    createdAt?: boolean;
    publishedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    votes?: boolean | Prisma.Test$votesArgs<ExtArgs>;
    events?: boolean | Prisma.Test$eventsArgs<ExtArgs>;
    _count?: boolean | Prisma.TestCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["test"]>;
export type TestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    title?: boolean;
    descA?: boolean;
    descB?: boolean;
    imageAUrl?: boolean;
    imageBUrl?: boolean;
    status?: boolean;
    createdAt?: boolean;
    publishedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["test"]>;
export type TestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    title?: boolean;
    descA?: boolean;
    descB?: boolean;
    imageAUrl?: boolean;
    imageBUrl?: boolean;
    status?: boolean;
    createdAt?: boolean;
    publishedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["test"]>;
export type TestSelectScalar = {
    id?: boolean;
    userId?: boolean;
    title?: boolean;
    descA?: boolean;
    descB?: boolean;
    imageAUrl?: boolean;
    imageBUrl?: boolean;
    status?: boolean;
    createdAt?: boolean;
    publishedAt?: boolean;
};
export type TestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "title" | "descA" | "descB" | "imageAUrl" | "imageBUrl" | "status" | "createdAt" | "publishedAt", ExtArgs["result"]["test"]>;
export type TestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    votes?: boolean | Prisma.Test$votesArgs<ExtArgs>;
    events?: boolean | Prisma.Test$eventsArgs<ExtArgs>;
    _count?: boolean | Prisma.TestCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type TestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $TestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Test";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        votes: Prisma.$VotePayload<ExtArgs>[];
        events: Prisma.$EventPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        title: string;
        descA: string | null;
        descB: string | null;
        imageAUrl: string;
        imageBUrl: string;
        status: $Enums.TestStatus;
        createdAt: Date;
        publishedAt: Date | null;
    }, ExtArgs["result"]["test"]>;
    composites: {};
};
export type TestGetPayload<S extends boolean | null | undefined | TestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TestPayload, S>;
export type TestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TestCountAggregateInputType | true;
};
export interface TestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Test'];
        meta: {
            name: 'Test';
        };
    };
    /**
     * Find zero or one Test that matches the filter.
     * @param {TestFindUniqueArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestFindUniqueArgs>(args: Prisma.SelectSubset<T, TestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TestClient<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Test that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestFindUniqueOrThrowArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TestClient<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Test that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFindFirstArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestFindFirstArgs>(args?: Prisma.SelectSubset<T, TestFindFirstArgs<ExtArgs>>): Prisma.Prisma__TestClient<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Test that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFindFirstOrThrowArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TestClient<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Tests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tests
     * const tests = await prisma.test.findMany()
     *
     * // Get first 10 Tests
     * const tests = await prisma.test.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const testWithIdOnly = await prisma.test.findMany({ select: { id: true } })
     *
     */
    findMany<T extends TestFindManyArgs>(args?: Prisma.SelectSubset<T, TestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Test.
     * @param {TestCreateArgs} args - Arguments to create a Test.
     * @example
     * // Create one Test
     * const Test = await prisma.test.create({
     *   data: {
     *     // ... data to create a Test
     *   }
     * })
     *
     */
    create<T extends TestCreateArgs>(args: Prisma.SelectSubset<T, TestCreateArgs<ExtArgs>>): Prisma.Prisma__TestClient<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Tests.
     * @param {TestCreateManyArgs} args - Arguments to create many Tests.
     * @example
     * // Create many Tests
     * const test = await prisma.test.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends TestCreateManyArgs>(args?: Prisma.SelectSubset<T, TestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Tests and returns the data saved in the database.
     * @param {TestCreateManyAndReturnArgs} args - Arguments to create many Tests.
     * @example
     * // Create many Tests
     * const test = await prisma.test.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Tests and only return the `id`
     * const testWithIdOnly = await prisma.test.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends TestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Test.
     * @param {TestDeleteArgs} args - Arguments to delete one Test.
     * @example
     * // Delete one Test
     * const Test = await prisma.test.delete({
     *   where: {
     *     // ... filter to delete one Test
     *   }
     * })
     *
     */
    delete<T extends TestDeleteArgs>(args: Prisma.SelectSubset<T, TestDeleteArgs<ExtArgs>>): Prisma.Prisma__TestClient<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Test.
     * @param {TestUpdateArgs} args - Arguments to update one Test.
     * @example
     * // Update one Test
     * const test = await prisma.test.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends TestUpdateArgs>(args: Prisma.SelectSubset<T, TestUpdateArgs<ExtArgs>>): Prisma.Prisma__TestClient<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Tests.
     * @param {TestDeleteManyArgs} args - Arguments to filter Tests to delete.
     * @example
     * // Delete a few Tests
     * const { count } = await prisma.test.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends TestDeleteManyArgs>(args?: Prisma.SelectSubset<T, TestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Tests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tests
     * const test = await prisma.test.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends TestUpdateManyArgs>(args: Prisma.SelectSubset<T, TestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Tests and returns the data updated in the database.
     * @param {TestUpdateManyAndReturnArgs} args - Arguments to update many Tests.
     * @example
     * // Update many Tests
     * const test = await prisma.test.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Tests and only return the `id`
     * const testWithIdOnly = await prisma.test.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends TestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Test.
     * @param {TestUpsertArgs} args - Arguments to update or create a Test.
     * @example
     * // Update or create a Test
     * const test = await prisma.test.upsert({
     *   create: {
     *     // ... data to create a Test
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Test we want to update
     *   }
     * })
     */
    upsert<T extends TestUpsertArgs>(args: Prisma.SelectSubset<T, TestUpsertArgs<ExtArgs>>): Prisma.Prisma__TestClient<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Tests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCountArgs} args - Arguments to filter Tests to count.
     * @example
     * // Count the number of Tests
     * const count = await prisma.test.count({
     *   where: {
     *     // ... the filter for the Tests we want to count
     *   }
     * })
    **/
    count<T extends TestCountArgs>(args?: Prisma.Subset<T, TestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TestCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Test.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestAggregateArgs>(args: Prisma.Subset<T, TestAggregateArgs>): Prisma.PrismaPromise<GetTestAggregateType<T>>;
    /**
     * Group by Test.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends TestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TestGroupByArgs['orderBy'];
    } : {
        orderBy?: TestGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Test model
     */
    readonly fields: TestFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Test.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__TestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    votes<T extends Prisma.Test$votesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Test$votesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    events<T extends Prisma.Test$eventsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Test$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Test model
 */
export interface TestFieldRefs {
    readonly id: Prisma.FieldRef<"Test", 'String'>;
    readonly userId: Prisma.FieldRef<"Test", 'String'>;
    readonly title: Prisma.FieldRef<"Test", 'String'>;
    readonly descA: Prisma.FieldRef<"Test", 'String'>;
    readonly descB: Prisma.FieldRef<"Test", 'String'>;
    readonly imageAUrl: Prisma.FieldRef<"Test", 'String'>;
    readonly imageBUrl: Prisma.FieldRef<"Test", 'String'>;
    readonly status: Prisma.FieldRef<"Test", 'TestStatus'>;
    readonly createdAt: Prisma.FieldRef<"Test", 'DateTime'>;
    readonly publishedAt: Prisma.FieldRef<"Test", 'DateTime'>;
}
/**
 * Test findUnique
 */
export type TestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: Prisma.TestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Test
     */
    omit?: Prisma.TestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TestInclude<ExtArgs> | null;
    /**
     * Filter, which Test to fetch.
     */
    where: Prisma.TestWhereUniqueInput;
};
/**
 * Test findUniqueOrThrow
 */
export type TestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: Prisma.TestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Test
     */
    omit?: Prisma.TestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TestInclude<ExtArgs> | null;
    /**
     * Filter, which Test to fetch.
     */
    where: Prisma.TestWhereUniqueInput;
};
/**
 * Test findFirst
 */
export type TestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: Prisma.TestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Test
     */
    omit?: Prisma.TestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TestInclude<ExtArgs> | null;
    /**
     * Filter, which Test to fetch.
     */
    where?: Prisma.TestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tests to fetch.
     */
    orderBy?: Prisma.TestOrderByWithRelationInput | Prisma.TestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Tests.
     */
    cursor?: Prisma.TestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Tests.
     */
    distinct?: Prisma.TestScalarFieldEnum | Prisma.TestScalarFieldEnum[];
};
/**
 * Test findFirstOrThrow
 */
export type TestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: Prisma.TestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Test
     */
    omit?: Prisma.TestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TestInclude<ExtArgs> | null;
    /**
     * Filter, which Test to fetch.
     */
    where?: Prisma.TestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tests to fetch.
     */
    orderBy?: Prisma.TestOrderByWithRelationInput | Prisma.TestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Tests.
     */
    cursor?: Prisma.TestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Tests.
     */
    distinct?: Prisma.TestScalarFieldEnum | Prisma.TestScalarFieldEnum[];
};
/**
 * Test findMany
 */
export type TestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: Prisma.TestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Test
     */
    omit?: Prisma.TestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TestInclude<ExtArgs> | null;
    /**
     * Filter, which Tests to fetch.
     */
    where?: Prisma.TestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tests to fetch.
     */
    orderBy?: Prisma.TestOrderByWithRelationInput | Prisma.TestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Tests.
     */
    cursor?: Prisma.TestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tests.
     */
    skip?: number;
    distinct?: Prisma.TestScalarFieldEnum | Prisma.TestScalarFieldEnum[];
};
/**
 * Test create
 */
export type TestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: Prisma.TestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Test
     */
    omit?: Prisma.TestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TestInclude<ExtArgs> | null;
    /**
     * The data needed to create a Test.
     */
    data: Prisma.XOR<Prisma.TestCreateInput, Prisma.TestUncheckedCreateInput>;
};
/**
 * Test createMany
 */
export type TestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tests.
     */
    data: Prisma.TestCreateManyInput | Prisma.TestCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Test createManyAndReturn
 */
export type TestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: Prisma.TestSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Test
     */
    omit?: Prisma.TestOmit<ExtArgs> | null;
    /**
     * The data used to create many Tests.
     */
    data: Prisma.TestCreateManyInput | Prisma.TestCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TestIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Test update
 */
export type TestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: Prisma.TestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Test
     */
    omit?: Prisma.TestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TestInclude<ExtArgs> | null;
    /**
     * The data needed to update a Test.
     */
    data: Prisma.XOR<Prisma.TestUpdateInput, Prisma.TestUncheckedUpdateInput>;
    /**
     * Choose, which Test to update.
     */
    where: Prisma.TestWhereUniqueInput;
};
/**
 * Test updateMany
 */
export type TestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Tests.
     */
    data: Prisma.XOR<Prisma.TestUpdateManyMutationInput, Prisma.TestUncheckedUpdateManyInput>;
    /**
     * Filter which Tests to update
     */
    where?: Prisma.TestWhereInput;
    /**
     * Limit how many Tests to update.
     */
    limit?: number;
};
/**
 * Test updateManyAndReturn
 */
export type TestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: Prisma.TestSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Test
     */
    omit?: Prisma.TestOmit<ExtArgs> | null;
    /**
     * The data used to update Tests.
     */
    data: Prisma.XOR<Prisma.TestUpdateManyMutationInput, Prisma.TestUncheckedUpdateManyInput>;
    /**
     * Filter which Tests to update
     */
    where?: Prisma.TestWhereInput;
    /**
     * Limit how many Tests to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Test upsert
 */
export type TestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: Prisma.TestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Test
     */
    omit?: Prisma.TestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TestInclude<ExtArgs> | null;
    /**
     * The filter to search for the Test to update in case it exists.
     */
    where: Prisma.TestWhereUniqueInput;
    /**
     * In case the Test found by the `where` argument doesn't exist, create a new Test with this data.
     */
    create: Prisma.XOR<Prisma.TestCreateInput, Prisma.TestUncheckedCreateInput>;
    /**
     * In case the Test was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.TestUpdateInput, Prisma.TestUncheckedUpdateInput>;
};
/**
 * Test delete
 */
export type TestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: Prisma.TestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Test
     */
    omit?: Prisma.TestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TestInclude<ExtArgs> | null;
    /**
     * Filter which Test to delete.
     */
    where: Prisma.TestWhereUniqueInput;
};
/**
 * Test deleteMany
 */
export type TestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Tests to delete
     */
    where?: Prisma.TestWhereInput;
    /**
     * Limit how many Tests to delete.
     */
    limit?: number;
};
/**
 * Test.votes
 */
export type Test$votesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: Prisma.VoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Vote
     */
    omit?: Prisma.VoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VoteInclude<ExtArgs> | null;
    where?: Prisma.VoteWhereInput;
    orderBy?: Prisma.VoteOrderByWithRelationInput | Prisma.VoteOrderByWithRelationInput[];
    cursor?: Prisma.VoteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VoteScalarFieldEnum | Prisma.VoteScalarFieldEnum[];
};
/**
 * Test.events
 */
export type Test$eventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: Prisma.EventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Event
     */
    omit?: Prisma.EventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventInclude<ExtArgs> | null;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput | Prisma.EventOrderByWithRelationInput[];
    cursor?: Prisma.EventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EventScalarFieldEnum | Prisma.EventScalarFieldEnum[];
};
/**
 * Test without action
 */
export type TestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: Prisma.TestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Test
     */
    omit?: Prisma.TestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TestInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Test.d.ts.map