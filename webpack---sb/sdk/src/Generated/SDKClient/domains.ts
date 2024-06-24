/**
 * ⚠️ GENERATED CODE - DO NOT MODIFY BY HAND
 *
 * 🔨️ GENERATED BY kotlin/tools/code-generator-common/src/main/kotlin/com/sumstats/codegenerator/common/sdk/typescript/SDKTypescriptGenerator.kt
 */
import type { IActivateDomainCommand } from "../platform/domains/api/command/ActivateDomainCommand"
import type { ICheckDomainIsActiveQuery } from "../platform/domains/api/query/CheckDomainIsActiveQuery"
import type { ICreateCloudflareCommand } from "../platform/domains/api/command/CreateCloudflareCommand"
import type { ICreateDomainCommand } from "../platform/domains/api/command/CreateDomainCommand"
import type { IDomainsReadDto } from "../platform/domains/api/dto/DomainsReadDto"
import type { IGetCurrentDomainQuery } from "../platform/domains/api/query/GetCurrentDomainQuery"
import type { IGetDomainsQuery } from "../platform/domains/api/query/GetDomainsQuery"
import type { IReloadDomainsBlacklistCommand } from "../platform/domains/api/command/ReloadDomainsBlacklistCommand"
import type { IRemoveDomainCommand } from "../platform/domains/api/command/RemoveDomainCommand"
import type { IRestoreDomainCommand } from "../platform/domains/api/command/RestoreDomainCommand"
import type { ISetMainDomainCommand } from "../platform/domains/api/command/SetMainDomainCommand"
import { IRpcClient } from "@sb/network-bus/RpcClient";
import { IMetadata } from "@sb/network-bus/Model";
import { ISetting } from "@sb/network-bus/Model";
import { emptySettings } from "@sb/network-bus/Model";
import { domains_location } from "./ProxyLocations";

/**
 * The message requires one of the following roles: ANON_ROLE
 * [!] The message doesn't have error mappings.
 */
export const call_CheckDomainIsActiveQuery = (client: IRpcClient, payload: ICheckDomainIsActiveQuery, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<ICheckDomainIsActiveQuery, boolean>(payload, `sumstats.platform.domains.query.check_domain_is_active`, `${domains_location}/sumstats.platform.domains.query.check_domain_is_active`, metadata, settings);

/**
 * The message requires one of the following roles: ANON_ROLE
 * [!] The message doesn't have error mappings.
 */
export const call_GetCurrentDomainQuery = (client: IRpcClient, payload: IGetCurrentDomainQuery, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<IGetCurrentDomainQuery, string | null | undefined>(payload, `sumstats.platform.domains.query.get_current_domain`, `${domains_location}/sumstats.platform.domains.query.get_current_domain`, metadata, settings);

/**
 * The message requires one of the following roles: OPERATOR_ROLE
 * The message requires the following acl: '018d882b-3d87-7a4b-9e5c-22137f449a7f(default)'.
 * [!] The message doesn't have error mappings.
 */
export const call_ActivateDomainCommand = (client: IRpcClient, payload: IActivateDomainCommand, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<IActivateDomainCommand, null>(payload, `sumstats.platform.domains.command.activate_domain`, `${domains_location}/sumstats.platform.domains.command.activate_domain`, metadata, settings);

/**
 * The message requires one of the following roles: OPERATOR_ROLE
 * The message requires the following acl: '018d882b-3d87-7a4b-9e5c-22137f449a7f(default)'.
 * [!] The message doesn't have error mappings.
 */
export const call_CreateCloudflareCommand = (client: IRpcClient, payload: ICreateCloudflareCommand, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<ICreateCloudflareCommand, null>(payload, `sumstats.platform.domains.command.create_cloudflare`, `${domains_location}/sumstats.platform.domains.command.create_cloudflare`, metadata, settings);

/**
 * The message requires one of the following roles: OPERATOR_ROLE
 * The message requires the following acl: '018d882b-3d87-7a4b-9e5c-22137f449a7f(default)'.
 * [!] The message doesn't have error mappings.
 */
export const call_CreateDomainCommand = (client: IRpcClient, payload: ICreateDomainCommand, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<ICreateDomainCommand, null>(payload, `sumstats.platform.domains.command.create_domain`, `${domains_location}/sumstats.platform.domains.command.create_domain`, metadata, settings);

/**
 * The message requires one of the following roles: OPERATOR_ROLE
 * The message requires the following acl: '018d882b-3d87-7a4b-9e5c-22137f449a7f(default)'.
 * [!] The message doesn't have error mappings.
 */
export const call_RemoveDomainCommand = (client: IRpcClient, payload: IRemoveDomainCommand, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<IRemoveDomainCommand, null>(payload, `sumstats.platform.domains.command.remove_domain`, `${domains_location}/sumstats.platform.domains.command.remove_domain`, metadata, settings);

/**
 * The message requires one of the following roles: OPERATOR_ROLE
 * The message requires the following acl: '018d882b-3d87-7a4b-9e5c-22137f449a7f(default)'.
 * [!] The message doesn't have error mappings.
 */
export const call_RestoreDomainCommand = (client: IRpcClient, payload: IRestoreDomainCommand, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<IRestoreDomainCommand, null>(payload, `sumstats.platform.domains.command.restore_domain`, `${domains_location}/sumstats.platform.domains.command.restore_domain`, metadata, settings);

/**
 * The message requires one of the following roles: OPERATOR_ROLE
 * The message requires the following acl: '018d882b-3d87-7a4b-9e5c-22137f449a7f(default)'.
 * [!] The message doesn't have error mappings.
 */
export const call_SetMainDomainCommand = (client: IRpcClient, payload: ISetMainDomainCommand, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<ISetMainDomainCommand, null>(payload, `sumstats.platform.domains.command.set_main_domain`, `${domains_location}/sumstats.platform.domains.command.set_main_domain`, metadata, settings);

/**
 * The message requires one of the following roles: OPERATOR_ROLE, SERVICE
 * The message requires the following acl: '018d882b-3d87-78f1-8c85-d6418739692e(default)'.
 * [!] The message doesn't have error mappings.
 */
export const call_GetDomainsQuery = (client: IRpcClient, payload: IGetDomainsQuery, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<IGetDomainsQuery, IDomainsReadDto>(payload, `sumstats.platform.domains.query.get_domains`, `${domains_location}/sumstats.platform.domains.query.get_domains`, metadata, settings);

/**
 * The message requires one of the following roles: SERVICE
 * [!] The message doesn't have error mappings.
 */
export const call_ReloadDomainsBlacklistCommand = (client: IRpcClient, payload: IReloadDomainsBlacklistCommand, metadata?: IMetadata, settings: ISetting = emptySettings) => client.call<IReloadDomainsBlacklistCommand, null>(payload, `sumstats.platform.domains.command.reload_domains_blacklist`, `${domains_location}/sumstats.platform.domains.command.reload_domains_blacklist`, metadata, settings);
