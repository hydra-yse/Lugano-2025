/* tslint:disable */
/* eslint-disable */
export function parseInvoice(input: string): LNInvoice;
export function setLogger(logger: Logger): void;
export function connect(req: ConnectRequest, plugins?: Plugin[] | null): Promise<BindingLiquidSdk>;
export function connectWithSigner(req: ConnectWithSignerRequest, signer: Signer, plugins?: Plugin[] | null): Promise<BindingLiquidSdk>;
export function defaultConfig(network: LiquidNetwork, breez_api_key?: string | null): Config;
/**
 * Entry point invoked by JavaScript in a worker.
 */
export function task_worker_entry_point(ptr: number): void;
/**
 * The `ReadableStreamType` enum.
 *
 * *This API requires the following crate features to be activated: `ReadableStreamType`*
 */
type ReadableStreamType = "bytes";
export interface EventListener {
    onEvent: (e: SdkEvent) => void;
}

export interface CheckMessageRequest {
    message: string;
    pubkey: string;
    signature: string;
}

export interface LNOffer {
    offer: string;
    chains: string[];
    minAmount?: Amount;
    description?: string;
    absoluteExpiry?: number;
    issuer?: string;
    signingPubkey?: string;
    paths: LnOfferBlindedPath[];
}

export interface Config {
    liquidExplorer: BlockchainExplorer;
    bitcoinExplorer: BlockchainExplorer;
    workingDir: string;
    network: LiquidNetwork;
    paymentTimeoutSec: number;
    syncServiceUrl?: string;
    zeroConfMaxAmountSat?: number;
    breezApiKey?: string;
    externalInputParsers?: ExternalInputParser[];
    useDefaultExternalInputParsers: boolean;
    onchainFeeRateLeewaySat?: number;
    assetMetadata?: AssetMetadata[];
    sideswapApiKey?: string;
    useMagicRoutingHints: boolean;
    onchainSyncPeriodSec: number;
    onchainSyncRequestTimeoutSec: number;
    customBoltzUrl?: string;
}

export interface Payment {
    destination?: string;
    txId?: string;
    unblindingData?: string;
    timestamp: number;
    amountSat: number;
    feesSat: number;
    swapperFeesSat?: number;
    paymentType: PaymentType;
    status: PaymentState;
    details: PaymentDetails;
}

export interface BuyBitcoinRequest {
    prepareResponse: PrepareBuyBitcoinResponse;
    redirectUrl?: string;
}

export interface ReceivePaymentResponse {
    destination: string;
    liquidExpirationBlockheight?: number;
    bitcoinExpirationBlockheight?: number;
}

export type SendDestination = { type: "liquidAddress"; addressData: LiquidAddressData; bip353Address?: string } | { type: "bolt11"; invoice: LNInvoice; bip353Address?: string } | { type: "bolt12"; offer: LNOffer; receiverAmountSat: number; bip353Address?: string };

export type PayAmount = { type: "bitcoin"; receiverAmountSat: number } | { type: "asset"; toAsset: string; receiverAmount: number; estimateAssetFees?: boolean; fromAsset?: string } | { type: "drain" };

export interface SendPaymentResponse {
    payment: Payment;
}

export interface PrepareSendRequest {
    destination: string;
    amount?: PayAmount;
    disableMrh?: boolean;
    paymentTimeoutSec?: number;
}

export type ReceiveAmount = { type: "bitcoin"; payerAmountSat: number } | { type: "asset"; assetId: string; payerAmount?: number };

export interface LnUrlErrorData {
    reason: string;
}

export interface AssetBalance {
    assetId: string;
    balanceSat: number;
    name?: string;
    ticker?: string;
    balance?: number;
}

export type Amount = { type: "bitcoin"; amountMsat: number } | { type: "currency"; iso4217Code: string; fractionalAmount: number };

export interface LnUrlWithdrawRequest {
    data: LnUrlWithdrawRequestData;
    amountMsat: number;
    description?: string;
}

export interface ExternalInputParser {
    providerId: string;
    inputRegex: string;
    parserUrl: string;
}

export interface LnUrlPaySuccessData {
    payment: Payment;
    successAction?: SuccessActionProcessed;
}

export interface Symbol {
    grapheme?: string;
    template?: string;
    rtl?: boolean;
    position?: number;
}

export interface LogEntry {
    line: string;
    level: string;
}

export type InputType = { type: "bitcoinAddress"; address: BitcoinAddressData } | { type: "liquidAddress"; address: LiquidAddressData } | { type: "bolt11"; invoice: LNInvoice } | { type: "bolt12Offer"; offer: LNOffer; bip353Address?: string } | { type: "nodeId"; nodeId: string } | { type: "url"; url: string } | { type: "lnUrlPay"; data: LnUrlPayRequestData; bip353Address?: string } | { type: "lnUrlWithdraw"; data: LnUrlWithdrawRequestData } | { type: "lnUrlAuth"; data: LnUrlAuthRequestData } | { type: "lnUrlError"; data: LnUrlErrorData };

export interface SendPaymentRequest {
    prepareResponse: PrepareSendResponse;
    useAssetFees?: boolean;
    payerNote?: string;
}

export interface LnUrlPayErrorData {
    paymentHash: string;
    reason: string;
}

export type PaymentDetails = { type: "lightning"; swapId: string; description: string; liquidExpirationBlockheight: number; preimage?: string; invoice?: string; bolt12Offer?: string; paymentHash?: string; destinationPubkey?: string; lnurlInfo?: LnUrlInfo; bip353Address?: string; payerNote?: string; claimTxId?: string; refundTxId?: string; refundTxAmountSat?: number } | { type: "liquid"; destination: string; description: string; assetId: string; assetInfo?: AssetInfo; lnurlInfo?: LnUrlInfo; bip353Address?: string; payerNote?: string } | { type: "bitcoin"; swapId: string; bitcoinAddress: string; description: string; autoAcceptedFees: boolean; liquidExpirationBlockheight: number; bitcoinExpirationBlockheight: number; lockupTxId?: string; claimTxId?: string; refundTxId?: string; refundTxAmountSat?: number };

export interface CreateBolt12InvoiceResponse {
    invoice: string;
}

export interface ListPaymentsRequest {
    filters?: PaymentType[];
    states?: PaymentState[];
    fromTimestamp?: number;
    toTimestamp?: number;
    offset?: number;
    limit?: number;
    details?: ListPaymentDetails;
    sortAscending?: boolean;
}

export interface PrepareRefundResponse {
    txVsize: number;
    txFeeSat: number;
    lastRefundTxId?: string;
}

export interface AcceptPaymentProposedFeesRequest {
    response: FetchPaymentProposedFeesResponse;
}

export interface LightningPaymentLimitsResponse {
    send: Limits;
    receive: Limits;
}

export interface PrepareReceiveRequest {
    paymentMethod: PaymentMethod;
    amount?: ReceiveAmount;
}

export interface RestoreRequest {
    backupPath?: string;
}

export interface AssetMetadata {
    assetId: string;
    name: string;
    ticker: string;
    precision: number;
    fiatId?: string;
}

export interface PrepareSendResponse {
    destination: SendDestination;
    amount?: PayAmount;
    feesSat?: number;
    estimatedAssetFees?: number;
    exchangeAmountSat?: number;
    disableMrh?: boolean;
    paymentTimeoutSec?: number;
}

export interface RefundableSwap {
    swapAddress: string;
    timestamp: number;
    amountSat: number;
    lastRefundTxId?: string;
}

export interface WalletInfo {
    balanceSat: number;
    pendingSendSat: number;
    pendingReceiveSat: number;
    fingerprint: string;
    pubkey: string;
    assetBalances: AssetBalance[];
}

export interface BlockchainInfo {
    liquidTip: number;
    bitcoinTip: number;
}

export interface BitcoinAddressData {
    address: string;
    network: Network;
    amountSat?: number;
    label?: string;
    message?: string;
}

export interface LNInvoice {
    bolt11: string;
    network: Network;
    payeePubkey: string;
    paymentHash: string;
    description?: string;
    descriptionHash?: string;
    amountMsat?: number;
    timestamp: number;
    expiry: number;
    routingHints: RouteHint[];
    paymentSecret: number[];
    minFinalCltvExpiryDelta: number;
}

export interface ConnectWithSignerRequest {
    config: Config;
}

export interface PrepareRefundRequest {
    swapAddress: string;
    refundAddress: string;
    feeRateSatPerVbyte: number;
}

export type AesSuccessActionDataResult = { type: "decrypted"; data: AesSuccessActionDataDecrypted } | { type: "errorStatus"; reason: string };

export interface PrepareBuyBitcoinRequest {
    provider: BuyBitcoinProvider;
    amountSat: number;
}

export interface GetInfoResponse {
    walletInfo: WalletInfo;
    blockchainInfo: BlockchainInfo;
}

export interface FiatCurrency {
    id: string;
    info: CurrencyInfo;
}

export interface PrepareBuyBitcoinResponse {
    provider: BuyBitcoinProvider;
    amountSat: number;
    feesSat: number;
}

export interface MessageSuccessActionData {
    message: string;
}

export type LiquidNetwork = "mainnet" | "testnet" | "regtest";

export interface LnOfferBlindedPath {
    blindedHops: string[];
}

export type PaymentStatus = "pending" | "complete";

export interface CreateBolt12InvoiceRequest {
    offer: string;
    invoiceRequest: string;
}

export interface PreparePayOnchainRequest {
    amount: PayAmount;
    feeRateSatPerVbyte?: number;
}

export type BlockchainExplorer = { type: "esplora"; url: string; useWaterfalls: boolean };

export interface ReceivePaymentRequest {
    prepareResponse: PrepareReceiveResponse;
    description?: string;
    useDescriptionHash?: boolean;
    payerNote?: string;
}

export interface Rate {
    coin: string;
    value: number;
}

export interface SignMessageRequest {
    message: string;
}

export type PaymentType = "receive" | "send";

export interface PreparePayOnchainResponse {
    receiverAmountSat: number;
    claimFeesSat: number;
    totalFeesSat: number;
}

export interface RefundResponse {
    refundTxId: string;
}

export interface LnUrlWithdrawSuccessData {
    invoice: LNInvoice;
}

export interface LnUrlInfo {
    lnAddress?: string;
    lnurlPayComment?: string;
    lnurlPayDomain?: string;
    lnurlPayMetadata?: string;
    lnurlPaySuccessAction?: SuccessActionProcessed;
    lnurlPayUnprocessedSuccessAction?: SuccessAction;
    lnurlWithdrawEndpoint?: string;
}

export interface AssetInfo {
    name: string;
    ticker: string;
    amount: number;
    fees?: number;
}

export interface FetchPaymentProposedFeesRequest {
    swapId: string;
}

export interface LnUrlAuthRequestData {
    k1: string;
    action?: string;
    domain: string;
    url: string;
}

export interface ConnectRequest {
    config: Config;
    mnemonic?: string;
    passphrase?: string;
    seed?: number[];
}

export interface LnUrlPayRequest {
    prepareResponse: PrepareLnUrlPayResponse;
}

export interface PrepareReceiveResponse {
    paymentMethod: PaymentMethod;
    feesSat: number;
    amount?: ReceiveAmount;
    minPayerAmountSat?: number;
    maxPayerAmountSat?: number;
    swapperFeerate?: number;
}

export interface AesSuccessActionDataDecrypted {
    description: string;
    plaintext: string;
}

export type LnUrlPayResult = { type: "endpointSuccess"; data: LnUrlPaySuccessData } | { type: "endpointError"; data: LnUrlErrorData } | { type: "payError"; data: LnUrlPayErrorData };

export type SdkEvent = { type: "paymentFailed"; details: Payment } | { type: "paymentPending"; details: Payment } | { type: "paymentRefundable"; details: Payment } | { type: "paymentRefunded"; details: Payment } | { type: "paymentRefundPending"; details: Payment } | { type: "paymentSucceeded"; details: Payment } | { type: "paymentWaitingConfirmation"; details: Payment } | { type: "paymentWaitingFeeAcceptance"; details: Payment } | { type: "synced" } | { type: "syncFailed"; error: string } | { type: "dataSynced"; didPullNewRecords: boolean };

export type SuccessAction = { type: "aes"; data: AesSuccessActionData } | { type: "message"; data: MessageSuccessActionData } | { type: "url"; data: UrlSuccessActionData };

export interface AesSuccessActionData {
    description: string;
    ciphertext: string;
    iv: string;
}

export type BuyBitcoinProvider = "moonpay";

export interface LnUrlWithdrawRequestData {
    callback: string;
    k1: string;
    defaultDescription: string;
    minWithdrawable: number;
    maxWithdrawable: number;
}

export type ListPaymentDetails = { type: "liquid"; assetId?: string; destination?: string } | { type: "bitcoin"; address?: string };

export type PaymentState = "created" | "pending" | "complete" | "failed" | "timedOut" | "refundable" | "refundPending" | "waitingFeeAcceptance";

export interface RouteHint {
    hops: RouteHintHop[];
}

export interface SignMessageResponse {
    signature: string;
}

export interface CurrencyInfo {
    name: string;
    fractionSize: number;
    spacing?: number;
    symbol?: Symbol;
    uniqSymbol?: Symbol;
    localizedName: LocalizedName[];
    localeOverrides: LocaleOverrides[];
}

export interface OnchainPaymentLimitsResponse {
    send: Limits;
    receive: Limits;
}

export interface RouteHintHop {
    srcNodeId: string;
    shortChannelId: string;
    feesBaseMsat: number;
    feesProportionalMillionths: number;
    cltvExpiryDelta: number;
    htlcMinimumMsat?: number;
    htlcMaximumMsat?: number;
}

export interface PrepareLnUrlPayResponse {
    destination: SendDestination;
    feesSat: number;
    data: LnUrlPayRequestData;
    amount: PayAmount;
    comment?: string;
    successAction?: SuccessAction;
}

export type LnUrlWithdrawResult = { type: "ok"; data: LnUrlWithdrawSuccessData } | { type: "timeout"; data: LnUrlWithdrawSuccessData } | { type: "errorStatus"; data: LnUrlErrorData };

export interface PrepareLnUrlPayRequest {
    data: LnUrlPayRequestData;
    amount: PayAmount;
    bip353Address?: string;
    comment?: string;
    validateSuccessActionUrl?: boolean;
}

export interface LocalizedName {
    locale: string;
    name: string;
}

export type PaymentMethod = "bolt11Invoice" | "bolt12Offer" | "bitcoinAddress" | "liquidAddress";

export interface FetchPaymentProposedFeesResponse {
    swapId: string;
    feesSat: number;
    payerAmountSat: number;
    receiverAmountSat: number;
}

export interface Limits {
    minSat: number;
    maxSat: number;
    maxZeroConfSat: number;
}

export type GetPaymentRequest = { type: "paymentHash"; paymentHash: string } | { type: "swapId"; swapId: string };

export interface RefundRequest {
    swapAddress: string;
    refundAddress: string;
    feeRateSatPerVbyte: number;
}

export interface LocaleOverrides {
    locale: string;
    spacing?: number;
    symbol: Symbol;
}

export type LnUrlCallbackStatus = { type: "ok" } | ({ type: "errorStatus" } & {} & LnUrlErrorData);

export type Network = "bitcoin" | "testnet" | "signet" | "regtest";

export interface PayOnchainRequest {
    address: string;
    prepareResponse: PreparePayOnchainResponse;
}

export interface CheckMessageResponse {
    isValid: boolean;
}

export interface BackupRequest {
    backupPath?: string;
}

export interface UrlSuccessActionData {
    description: string;
    url: string;
    matchesCallbackDomain: boolean;
}

export interface RecommendedFees {
    fastestFee: number;
    halfHourFee: number;
    hourFee: number;
    economyFee: number;
    minimumFee: number;
}

export interface LnUrlPayRequestData {
    callback: string;
    minSendable: number;
    maxSendable: number;
    metadataStr: string;
    commentAllowed: number;
    domain: string;
    allowsNostr: boolean;
    nostrPubkey?: string;
    lnAddress?: string;
}

export interface LiquidAddressData {
    address: string;
    network: Network;
    assetId?: string;
    amount?: number;
    amountSat?: number;
    label?: string;
    message?: string;
}

export type SuccessActionProcessed = { type: "aes"; result: AesSuccessActionDataResult } | { type: "message"; data: MessageSuccessActionData } | { type: "url"; data: UrlSuccessActionData };

export interface Logger {
    log: (l: LogEntry) => void;
}

export interface Plugin {
    id: () => string;
    onStart: (plugin_sdk: PluginSdk, storage: PluginStorage) => void;
    onStop: () => void;
}

export interface NwcConfig {
    relayUrls?: string[];
    secretKeyHex?: string;
}

export interface NwcEventListener {
        onEvent: (e: NwcEvent) => void;
    }

export type NwcEventDetails = { type: "connected" } | { type: "disconnected" } | { type: "payInvoice"; success: boolean; preimage?: string; feesSat?: number; error?: string } | { type: "listTransactions" } | { type: "getBalance" };

export interface NwcEvent {
    eventId?: string;
    details: NwcEventDetails;
}

export interface Signer {
    xpub: () => number[];
    deriveXpub: (derivationPath: string) => number[];
    signEcdsa: (msg: number[], derivationPath: string) => number[];
    signEcdsaRecoverable: (msg: number[]) => number[];
    slip77MasterBlindingKey: () => number[];
    hmacSha256: (msg: number[], derivationPath: string) => number[];
    eciesEncrypt: (msg: number[]) => number[];
    eciesDecrypt: (msg: number[]) => number[];
}

export class BindingLiquidSdk {
  private constructor();
  free(): void;
  disconnect(): Promise<void>;
  lnurlAuth(req_data: LnUrlAuthRequestData): Promise<LnUrlCallbackStatus>;
  buyBitcoin(req: BuyBitcoinRequest): Promise<string>;
  getPayment(req: GetPaymentRequest): Promise<Payment | undefined>;
  payOnchain(req: PayOnchainRequest): Promise<SendPaymentResponse>;
  sendPayment(req: SendPaymentRequest): Promise<SendPaymentResponse>;
  signMessage(req: SignMessageRequest): SignMessageResponse;
  checkMessage(req: CheckMessageRequest): CheckMessageResponse;
  listPayments(req: ListPaymentsRequest): Promise<Payment[]>;
  lnurlWithdraw(req: LnUrlWithdrawRequest): Promise<LnUrlWithdrawResult>;
  prepareRefund(req: PrepareRefundRequest): Promise<PrepareRefundResponse>;
  receivePayment(req: ReceivePaymentRequest): Promise<ReceivePaymentResponse>;
  fetchFiatRates(): Promise<Rate[]>;
  listRefundables(): Promise<RefundableSwap[]>;
  recommendedFees(): Promise<RecommendedFees>;
  registerWebhook(webhook_url: string): Promise<void>;
  prepareLnurlPay(req: PrepareLnUrlPayRequest): Promise<PrepareLnUrlPayResponse>;
  addEventListener(listener: EventListener): Promise<string>;
  unregisterWebhook(): Promise<void>;
  prepareBuyBitcoin(req: PrepareBuyBitcoinRequest): Promise<PrepareBuyBitcoinResponse>;
  preparePayOnchain(req: PreparePayOnchainRequest): Promise<PreparePayOnchainResponse>;
  fetchOnchainLimits(): Promise<OnchainPaymentLimitsResponse>;
  listFiatCurrencies(): Promise<FiatCurrency[]>;
  prepareSendPayment(req: PrepareSendRequest): Promise<PrepareSendResponse>;
  rescanOnchainSwaps(): Promise<void>;
  createBolt12Invoice(req: CreateBolt12InvoiceRequest): Promise<CreateBolt12InvoiceResponse>;
  removeEventListener(id: string): Promise<void>;
  fetchLightningLimits(): Promise<LightningPaymentLimitsResponse>;
  prepareReceivePayment(req: PrepareReceiveRequest): Promise<PrepareReceiveResponse>;
  fetchPaymentProposedFees(req: FetchPaymentProposedFeesRequest): Promise<FetchPaymentProposedFeesResponse>;
  acceptPaymentProposedFees(req: AcceptPaymentProposedFeesRequest): Promise<void>;
  sync(): Promise<void>;
  parse(input: string): Promise<InputType>;
  backup(req: BackupRequest): void;
  refund(req: RefundRequest): Promise<RefundResponse>;
  restore(req: RestoreRequest): void;
  getInfo(): Promise<GetInfoResponse>;
  lnurlPay(req: LnUrlPayRequest): Promise<LnUrlPayResult>;
}
export class BindingNwcService {
  free(): void;
  addEventListener(listener: NwcEventListener): Promise<string>;
  addConnectionString(name: string): Promise<string>;
  removeEventListener(listener_id: string): Promise<void>;
  listConnectionStrings(): Promise<Map<any, any>>;
  removeConnectionString(name: string): Promise<void>;
  /**
   * Plugin
   */
  id(): string;
  constructor(config: NwcConfig);
  onStop(): Promise<void>;
  onStart(plugin_sdk: PluginSdk, storage: PluginStorage): Promise<void>;
}
export class IntoUnderlyingByteSource {
  private constructor();
  free(): void;
  pull(controller: ReadableByteStreamController): Promise<any>;
  start(controller: ReadableByteStreamController): void;
  cancel(): void;
  readonly autoAllocateChunkSize: number;
  readonly type: ReadableStreamType;
}
export class IntoUnderlyingSink {
  private constructor();
  free(): void;
  abort(reason: any): Promise<any>;
  close(): Promise<any>;
  write(chunk: any): Promise<any>;
}
export class IntoUnderlyingSource {
  private constructor();
  free(): void;
  pull(controller: ReadableStreamDefaultController): Promise<any>;
  cancel(): void;
}
export class PluginSdk {
  private constructor();
  free(): void;
  sendPayment(req: SendPaymentRequest): Promise<SendPaymentResponse>;
  receivePayment(req: ReceivePaymentRequest): Promise<ReceivePaymentResponse>;
  addEventListener(listener: EventListener): Promise<string>;
  prepareSendPayment(req: PrepareSendRequest): Promise<PrepareSendResponse>;
  removeEventListener(id: string): Promise<void>;
  prepareReceivePayment(req: PrepareReceiveRequest): Promise<PrepareReceiveResponse>;
  getInfo(): Promise<GetInfoResponse>;
}
export class PluginStorage {
  private constructor();
  free(): void;
  removeItem(key: string): void;
  getItem(key: string): string | undefined;
  setItem(key: string, value: string): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_bindingliquidsdk_free: (a: number, b: number) => void;
  readonly __wbg_bindingnwcservice_free: (a: number, b: number) => void;
  readonly __wbg_pluginsdk_free: (a: number, b: number) => void;
  readonly __wbg_pluginstorage_free: (a: number, b: number) => void;
  readonly bindingliquidsdk_acceptPaymentProposedFees: (a: number, b: any) => any;
  readonly bindingliquidsdk_addEventListener: (a: number, b: any) => any;
  readonly bindingliquidsdk_backup: (a: number, b: any) => [number, number];
  readonly bindingliquidsdk_buyBitcoin: (a: number, b: any) => any;
  readonly bindingliquidsdk_checkMessage: (a: number, b: any) => [number, number, number];
  readonly bindingliquidsdk_createBolt12Invoice: (a: number, b: any) => any;
  readonly bindingliquidsdk_disconnect: (a: number) => any;
  readonly bindingliquidsdk_fetchFiatRates: (a: number) => any;
  readonly bindingliquidsdk_fetchLightningLimits: (a: number) => any;
  readonly bindingliquidsdk_fetchOnchainLimits: (a: number) => any;
  readonly bindingliquidsdk_fetchPaymentProposedFees: (a: number, b: any) => any;
  readonly bindingliquidsdk_getInfo: (a: number) => any;
  readonly bindingliquidsdk_getPayment: (a: number, b: any) => any;
  readonly bindingliquidsdk_listFiatCurrencies: (a: number) => any;
  readonly bindingliquidsdk_listPayments: (a: number, b: any) => any;
  readonly bindingliquidsdk_listRefundables: (a: number) => any;
  readonly bindingliquidsdk_lnurlAuth: (a: number, b: any) => any;
  readonly bindingliquidsdk_lnurlPay: (a: number, b: any) => any;
  readonly bindingliquidsdk_lnurlWithdraw: (a: number, b: any) => any;
  readonly bindingliquidsdk_parse: (a: number, b: number, c: number) => any;
  readonly bindingliquidsdk_payOnchain: (a: number, b: any) => any;
  readonly bindingliquidsdk_prepareBuyBitcoin: (a: number, b: any) => any;
  readonly bindingliquidsdk_prepareLnurlPay: (a: number, b: any) => any;
  readonly bindingliquidsdk_preparePayOnchain: (a: number, b: any) => any;
  readonly bindingliquidsdk_prepareReceivePayment: (a: number, b: any) => any;
  readonly bindingliquidsdk_prepareRefund: (a: number, b: any) => any;
  readonly bindingliquidsdk_prepareSendPayment: (a: number, b: any) => any;
  readonly bindingliquidsdk_receivePayment: (a: number, b: any) => any;
  readonly bindingliquidsdk_recommendedFees: (a: number) => any;
  readonly bindingliquidsdk_refund: (a: number, b: any) => any;
  readonly bindingliquidsdk_registerWebhook: (a: number, b: number, c: number) => any;
  readonly bindingliquidsdk_removeEventListener: (a: number, b: number, c: number) => any;
  readonly bindingliquidsdk_rescanOnchainSwaps: (a: number) => any;
  readonly bindingliquidsdk_restore: (a: number, b: any) => [number, number];
  readonly bindingliquidsdk_sendPayment: (a: number, b: any) => any;
  readonly bindingliquidsdk_signMessage: (a: number, b: any) => [number, number, number];
  readonly bindingliquidsdk_sync: (a: number) => any;
  readonly bindingliquidsdk_unregisterWebhook: (a: number) => any;
  readonly bindingnwcservice_addConnectionString: (a: number, b: number, c: number) => any;
  readonly bindingnwcservice_addEventListener: (a: number, b: any) => any;
  readonly bindingnwcservice_id: (a: number) => [number, number];
  readonly bindingnwcservice_listConnectionStrings: (a: number) => any;
  readonly bindingnwcservice_new: (a: any) => number;
  readonly bindingnwcservice_onStart: (a: number, b: number, c: number) => any;
  readonly bindingnwcservice_onStop: (a: number) => any;
  readonly bindingnwcservice_removeConnectionString: (a: number, b: number, c: number) => any;
  readonly bindingnwcservice_removeEventListener: (a: number, b: number, c: number) => any;
  readonly connect: (a: any, b: number, c: number) => any;
  readonly connectWithSigner: (a: any, b: any, c: number, d: number) => any;
  readonly defaultConfig: (a: any, b: number, c: number) => [number, number, number];
  readonly parseInvoice: (a: number, b: number) => [number, number, number];
  readonly pluginsdk_addEventListener: (a: number, b: any) => any;
  readonly pluginsdk_getInfo: (a: number) => any;
  readonly pluginsdk_prepareReceivePayment: (a: number, b: any) => any;
  readonly pluginsdk_prepareSendPayment: (a: number, b: any) => any;
  readonly pluginsdk_receivePayment: (a: number, b: any) => any;
  readonly pluginsdk_removeEventListener: (a: number, b: number, c: number) => any;
  readonly pluginsdk_sendPayment: (a: number, b: any) => any;
  readonly pluginstorage_getItem: (a: number, b: number, c: number) => [number, number, number, number];
  readonly pluginstorage_removeItem: (a: number, b: number, c: number) => [number, number];
  readonly pluginstorage_setItem: (a: number, b: number, c: number, d: number, e: number) => [number, number];
  readonly setLogger: (a: any) => [number, number];
  readonly rustsecp256k1_v0_6_1_context_create: (a: number) => number;
  readonly rustsecp256k1_v0_6_1_context_destroy: (a: number) => void;
  readonly rustsecp256k1_v0_6_1_default_error_callback_fn: (a: number, b: number) => void;
  readonly rustsecp256k1_v0_6_1_default_illegal_callback_fn: (a: number, b: number) => void;
  readonly rustsecp256k1_v0_10_0_context_create: (a: number) => number;
  readonly rustsecp256k1_v0_10_0_context_destroy: (a: number) => void;
  readonly rustsecp256k1_v0_10_0_default_error_callback_fn: (a: number, b: number) => void;
  readonly rustsecp256k1_v0_10_0_default_illegal_callback_fn: (a: number, b: number) => void;
  readonly rustsecp256k1zkp_v0_10_0_default_error_callback_fn: (a: number, b: number) => void;
  readonly rustsecp256k1zkp_v0_10_0_default_illegal_callback_fn: (a: number, b: number) => void;
  readonly rust_sqlite_wasm_shim_abort_js: () => void;
  readonly rust_sqlite_wasm_shim_calloc: (a: number, b: number) => number;
  readonly rust_sqlite_wasm_shim_malloc: (a: number) => number;
  readonly rust_sqlite_wasm_shim_emscripten_get_now: () => number;
  readonly rust_sqlite_wasm_shim_exit: (a: number) => void;
  readonly rust_sqlite_wasm_shim_free: (a: number) => void;
  readonly rust_sqlite_wasm_shim_localtime_js: (a: bigint, b: number) => void;
  readonly rust_sqlite_wasm_shim_realloc: (a: number, b: number) => number;
  readonly rust_sqlite_wasm_shim_tzset_js: (a: number, b: number, c: number, d: number) => void;
  readonly rust_sqlite_wasm_shim_wasi_random_get: (a: number, b: number) => number;
  readonly sqlite3_os_init: () => number;
  readonly task_worker_entry_point: (a: number) => [number, number];
  readonly __wbg_intounderlyingbytesource_free: (a: number, b: number) => void;
  readonly __wbg_intounderlyingsink_free: (a: number, b: number) => void;
  readonly __wbg_intounderlyingsource_free: (a: number, b: number) => void;
  readonly intounderlyingbytesource_autoAllocateChunkSize: (a: number) => number;
  readonly intounderlyingbytesource_cancel: (a: number) => void;
  readonly intounderlyingbytesource_pull: (a: number, b: any) => any;
  readonly intounderlyingbytesource_start: (a: number, b: any) => void;
  readonly intounderlyingbytesource_type: (a: number) => number;
  readonly intounderlyingsink_abort: (a: number, b: any) => any;
  readonly intounderlyingsink_close: (a: number) => any;
  readonly intounderlyingsink_write: (a: number, b: any) => any;
  readonly intounderlyingsource_cancel: (a: number) => void;
  readonly intounderlyingsource_pull: (a: number, b: any) => any;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_6: WebAssembly.Table;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly closure72_externref_shim_multivalue_shim: (a: number, b: number, c: any) => [number, number];
  readonly closure434_externref_shim: (a: number, b: number, c: any) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h1a63590616a063bd: (a: number, b: number) => void;
  readonly closure1004_externref_shim: (a: number, b: number, c: any, d: any) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
