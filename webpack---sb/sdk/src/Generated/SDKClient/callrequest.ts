/**
 * ⚠️ GENERATED CODE - DO NOT MODIFY BY HAND
 *
 * 🔨️ GENERATED BY kotlin/tools/code-generator-common/src/main/kotlin/com/sumstats/codegenerator/common/sdk/typescript/SDKTypescriptGenerator.kt
 */
import type { IAssignCallRequestCommand } from "../platform/callrequest/api/command/callrequest/AssignCallRequestCommand"
import type { ICallRequestLimitDto } from "../platform/callrequest/api/dto/CallRequestLimitDto"
import type { ICancelCallRequestCommand } from "../platform/callrequest/api/command/callrequest/CancelCallRequestCommand"
import type { ICreateCallRequestCommand } from "../platform/callrequest/api/command/callrequest/CreateCallRequestCommand"
import type { ICreateSlotsCommand } from "../platform/callrequest/api/command/slot/CreateSlotsCommand"
import type { IDeleteSlotsCommand } from "../platform/callrequest/api/command/slot/DeleteSlotsCommand"
import type { IEventToken } from "../eventstore/eventtoken/EventToken"
import type { IFindCallRequestLimitQuery } from "../platform/callrequest/api/command/callrequestlimit/FindCallRequestLimitQuery"
import type { ISetCallRequestLimitCommand } from "../platform/callrequest/api/command/callrequestlimit/SetCallRequestLimitCommand"
import type { ISetCallRequestNoteCommand } from "../platform/callrequest/api/command/callrequest/SetCallRequestNoteCommand"
import type { ISetCallRequestPriorityCommand } from "../platform/callrequest/api/command/callrequest/SetCallRequestPriorityCommand"
import type { ISetCallRequestStatusCommand } from "../platform/callrequest/api/command/callrequest/SetCallRequestStatusCommand"
import type { IUpdateCallOptionCommand } from "../platform/callrequest/api/command/calloption/UpdateCallOptionCommand"
import type { IUpdateCallOptionPositionsCommand } from "../platform/callrequest/api/command/calloption/UpdateCallOptionPositionsCommand"
import type { IUpdateCallRequestCommand } from "../platform/callrequest/api/command/callrequest/UpdateCallRequestCommand"
import type { IUpdateSlotsCommand } from "../platform/callrequest/api/command/slot/UpdateSlotsCommand"
import { IRpcClient } from "@sb/network-bus/RpcClient";
import { IMetadata } from "@sb/network-bus/Model";
import { ISetting } from "@sb/network-bus/Model";
import { emptySettings } from "@sb/network-bus/Model";
import { callrequest_location } from "./ProxyLocations";

/**
 * The message requires one of the following roles: OPERATOR_ROLE
 * The message error mappings described in IAssignCallRequestCommandErrorMapping
 */
export const call_AssignCallRequestCommand = (client: IRpcClient, payload: IAssignCallRequestCommand, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<IAssignCallRequestCommand, IEventToken>(payload, `sumstats.platform.callrequest.command.assign_call_request`, `${callrequest_location}/sumstats.platform.callrequest.command.assign_call_request`, metadata, settings);

/**
 * The message requires one of the following roles: OPERATOR_ROLE
 * The message error mappings described in ISetCallRequestNoteCommandErrorMapping
 */
export const call_SetCallRequestNoteCommand = (client: IRpcClient, payload: ISetCallRequestNoteCommand, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<ISetCallRequestNoteCommand, IEventToken>(payload, `sumstats.platform.callrequest.command.set_call_request_note`, `${callrequest_location}/sumstats.platform.callrequest.command.set_call_request_note`, metadata, settings);

/**
 * The message requires one of the following roles: OPERATOR_ROLE
 * The message error mappings described in ISetCallRequestPriorityCommandErrorMapping
 */
export const call_SetCallRequestPriorityCommand = (client: IRpcClient, payload: ISetCallRequestPriorityCommand, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<ISetCallRequestPriorityCommand, IEventToken>(payload, `sumstats.platform.callrequest.command.set_call_request_priority`, `${callrequest_location}/sumstats.platform.callrequest.command.set_call_request_priority`, metadata, settings);

/**
 * The message requires one of the following roles: OPERATOR_ROLE
 * The message error mappings described in ISetCallRequestStatusCommandErrorMapping
 */
export const call_SetCallRequestStatusCommand = (client: IRpcClient, payload: ISetCallRequestStatusCommand, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<ISetCallRequestStatusCommand, IEventToken>(payload, `sumstats.platform.callrequest.command.set_call_request_status`, `${callrequest_location}/sumstats.platform.callrequest.command.set_call_request_status`, metadata, settings);

/**
 * The message requires one of the following roles: OPERATOR_ROLE
 * The message requires the following acl: '018d881c-3f10-724e-b271-35c07c428757(default)'.
 * The message error mappings described in IUpdateCallRequestCommandErrorMapping
 */
export const call_UpdateCallRequestCommand = (client: IRpcClient, payload: IUpdateCallRequestCommand, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<IUpdateCallRequestCommand, null>(payload, `sumstats.platform.callrequest.command.update_call_request`, `${callrequest_location}/sumstats.platform.callrequest.command.update_call_request`, metadata, settings);

/**
 * The message requires one of the following roles: OPERATOR_ROLE
 * The message requires the following acl: '018d881c-3f10-7af1-bb9b-ca80e9669896(default)'.
 * The message error mappings described in ICreateSlotsCommandErrorMapping
 */
export const call_CreateSlotsCommand = (client: IRpcClient, payload: ICreateSlotsCommand, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<ICreateSlotsCommand, IEventToken>(payload, `sumstats.platform.callrequest.command.create_slots`, `${callrequest_location}/sumstats.platform.callrequest.command.create_slots`, metadata, settings);

/**
 * The message requires one of the following roles: OPERATOR_ROLE
 * The message requires the following acl: '018d881c-3f10-7d78-b3c8-220106084d32(default)'.
 * The message error mappings described in IDeleteSlotsCommandErrorMapping
 */
export const call_DeleteSlotsCommand = (client: IRpcClient, payload: IDeleteSlotsCommand, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<IDeleteSlotsCommand, IEventToken>(payload, `sumstats.platform.callrequest.command.delete_slots`, `${callrequest_location}/sumstats.platform.callrequest.command.delete_slots`, metadata, settings);

/**
 * The message requires one of the following roles: OPERATOR_ROLE
 * The message requires the following acl: '018d881c-3f10-7dd0-b916-623ba81d24e3(default),018d881c-3f10-7147-84e6-d9b22168358c(default)'.
 * The message error mappings described in IUpdateSlotsCommandErrorMapping
 */
export const call_UpdateSlotsCommand = (client: IRpcClient, payload: IUpdateSlotsCommand, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<IUpdateSlotsCommand, IEventToken | null | undefined>(payload, `sumstats.platform.callrequest.command.update_slots`, `${callrequest_location}/sumstats.platform.callrequest.command.update_slots`, metadata, settings);

/**
 * The message requires one of the following roles: OPERATOR_ROLE
 * The message requires the following acl: '018d881c-b2f1-7612-a07b-241d4fee6260(default)'.
 * [!] The message doesn't have error mappings.
 */
export const call_UpdateCallOptionCommand = (client: IRpcClient, payload: IUpdateCallOptionCommand, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<IUpdateCallOptionCommand, null>(payload, `sumstats.platform.callrequest.command.update_call_option`, `${callrequest_location}/sumstats.platform.callrequest.command.update_call_option`, metadata, settings);

/**
 * The message requires one of the following roles: OPERATOR_ROLE
 * The message requires the following acl: '018d881c-b2f1-7612-a07b-241d4fee6260(default)'.
 * [!] The message doesn't have error mappings.
 */
export const call_UpdateCallOptionPositionsCommand = (client: IRpcClient, payload: IUpdateCallOptionPositionsCommand, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<IUpdateCallOptionPositionsCommand, null>(payload, `sumstats.platform.callrequest.command.update_call_option_positions`, `${callrequest_location}/sumstats.platform.callrequest.command.update_call_option_positions`, metadata, settings);

/**
 * The message requires one of the following roles: OPERATOR_ROLE
 * The message requires the following acl: '01900cd6-fb97-792b-999a-f2797f19ab34(default)'.
 * [!] The message doesn't have error mappings.
 */
export const call_SetCallRequestLimitCommand = (client: IRpcClient, payload: ISetCallRequestLimitCommand, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<ISetCallRequestLimitCommand, null>(payload, `sumstats.platform.callrequest.command.set_call_request_limits`, `${callrequest_location}/sumstats.platform.callrequest.command.set_call_request_limits`, metadata, settings);

/**
 * The message requires one of the following roles: OPERATOR_ROLE
 * The message requires the following acl: '01900d1e-cf16-7144-adfd-779892c2214d(default)'.
 * [!] The message doesn't have error mappings.
 */
export const call_FindCallRequestLimitQuery = (client: IRpcClient, payload: IFindCallRequestLimitQuery, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<IFindCallRequestLimitQuery, ICallRequestLimitDto>(payload, `sumstats.platform.callrequest.query.get_call_request_limit`, `${callrequest_location}/sumstats.platform.callrequest.query.get_call_request_limit`, metadata, settings);

/**
 * The message requires one of the following roles: PLATFORM_PLAYER
 * The message error mappings described in ICancelCallRequestCommandErrorMapping
 */
export const call_CancelCallRequestCommand = (client: IRpcClient, payload: ICancelCallRequestCommand, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<ICancelCallRequestCommand, IEventToken>(payload, `sumstats.platform.callrequest.command.cancel_call_request`, `${callrequest_location}/sumstats.platform.callrequest.command.cancel_call_request`, metadata, settings);

/**
 * The message requires one of the following roles: PLATFORM_PLAYER
 * The message error mappings described in ICreateCallRequestCommandErrorMapping
 */
export const call_CreateCallRequestCommand = (client: IRpcClient, payload: ICreateCallRequestCommand, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<ICreateCallRequestCommand, { [key: string]: any }>(payload, `sumstats.platform.callrequest.command.create_call_request`, `${callrequest_location}/sumstats.platform.callrequest.command.create_call_request`, metadata, settings);
