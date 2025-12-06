/* tslint:disable */
/* eslint-disable */
export function connect(req: ConnectRequest, plugins?: Plugin[] | null): Promise<BindingLiquidSdk>;
export function connectWithSigner(req: ConnectWithSignerRequest, signer: Signer, plugins?: Plugin[] | null): Promise<BindingLiquidSdk>;
export function parseInvoice(input: string): LNInvoice;
export function setLogger(logger: Logger): void;
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

export interface BackupRequest {
    backupPath?: string;
}

export interface CreateBolt12InvoiceRequest {
    offer: string;
    invoiceRequest: string;
}

export interface Rate {
    coin: string;
    value: number;
}

export interface SignMessageResponse {
    signature: string;
}

export interface LogEntry {
    line: string;
    level: string;
}

export interface ConnectWithSignerRequest {
    config: Config;
}

export interface LocaleOverrides {
    locale: string;
    spacing?: number;
    symbol: Symbol;
}

export type ListPaymentDetails = { type: "liquid"; assetId?: string; destination?: string } | { type: "bitcoin"; address?: string };

export type PaymentType = "receive" | "send";

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

export interface LnUrlPayErrorData {
    paymentHash: string;
    reason: string;
}

export interface PrepareSendRequest {
    destination: string;
    amount?: PayAmount;
    disableMrh?: boolean;
    paymentTimeoutSec?: number;
}

export interface RefundResponse {
    refundTxId: string;
}

export interface ConnectRequest {
    config: Config;
    mnemonic?: string;
    passphrase?: string;
    seed?: number[];
}

export type LiquidNetwork = "mainnet" | "testnet" | "regtest";

export interface PrepareLnUrlPayResponse {
    destination: SendDestination;
    feesSat: number;
    data: LnUrlPayRequestData;
    amount: PayAmount;
    comment?: string;
    successAction?: SuccessAction;
}

export interface RefundableSwap {
    swapAddress: string;
    timestamp: number;
    amountSat: number;
    lastRefundTxId?: string;
}

export interface BitcoinAddressData {
    address: string;
    network: Network;
    amountSat?: number;
    label?: string;
    message?: string;
}

export interface FiatCurrency {
    id: string;
    info: CurrencyInfo;
}

export interface RecommendedFees {
    fastestFee: number;
    halfHourFee: number;
    hourFee: number;
    economyFee: number;
    minimumFee: number;
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

export interface MessageSuccessActionData {
    message: string;
}

export type PaymentDetails = { type: "lightning"; swapId: string; description: string; liquidExpirationBlockheight: number; preimage?: string; invoice?: string; bolt12Offer?: string; paymentHash?: string; destinationPubkey?: string; lnurlInfo?: LnUrlInfo; bip353Address?: string; payerNote?: string; claimTxId?: string; refundTxId?: string; refundTxAmountSat?: number } | { type: "liquid"; destination: string; description: string; assetId: string; assetInfo?: AssetInfo; lnurlInfo?: LnUrlInfo; bip353Address?: string; payerNote?: string } | { type: "bitcoin"; swapId: string; bitcoinAddress: string; description: string; autoAcceptedFees: boolean; liquidExpirationBlockheight: number; bitcoinExpirationBlockheight: number; lockupTxId?: string; claimTxId?: string; refundTxId?: string; refundTxAmountSat?: number };

export interface WalletInfo {
    balanceSat: number;
    pendingSendSat: number;
    pendingReceiveSat: number;
    fingerprint: string;
    pubkey: string;
    assetBalances: AssetBalance[];
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

export interface PrepareRefundRequest {
    swapAddress: string;
    refundAddress: string;
    feeRateSatPerVbyte: number;
}

export type PaymentStatus = "pending" | "complete";

export interface BlockchainInfo {
    liquidTip: number;
    bitcoinTip: number;
}

export interface LightningPaymentLimitsResponse {
    send: Limits;
    receive: Limits;
}

export interface FetchPaymentProposedFeesResponse {
    swapId: string;
    feesSat: number;
    payerAmountSat: number;
    receiverAmountSat: number;
}

export type PaymentMethod = "bolt11Invoice" | "bolt12Offer" | "bitcoinAddress" | "liquidAddress";

export interface AssetInfo {
    name: string;
    ticker: string;
    amount: number;
    fees?: number;
}

export interface Limits {
    minSat: number;
    maxSat: number;
    maxZeroConfSat: number;
}

export interface OnchainPaymentLimitsResponse {
    send: Limits;
    receive: Limits;
}

export type BuyBitcoinProvider = "moonpay";

export interface SignMessageRequest {
    message: string;
}

export interface PrepareReceiveResponse {
    paymentMethod: PaymentMethod;
    feesSat: number;
    amount?: ReceiveAmount;
    minPayerAmountSat?: number;
    maxPayerAmountSat?: number;
    swapperFeerate?: number;
}

export interface RefundRequest {
    swapAddress: string;
    refundAddress: string;
    feeRateSatPerVbyte: number;
}

export interface ReceivePaymentRequest {
    prepareResponse: PrepareReceiveResponse;
    description?: string;
    useDescriptionHash?: boolean;
    payerNote?: string;
}

export interface LnUrlPayRequest {
    prepareResponse: PrepareLnUrlPayResponse;
}

export type SdkEvent = { type: "paymentFailed"; details: Payment } | { type: "paymentPending"; details: Payment } | { type: "paymentRefundable"; details: Payment } | { type: "paymentRefunded"; details: Payment } | { type: "paymentRefundPending"; details: Payment } | { type: "paymentSucceeded"; details: Payment } | { type: "paymentWaitingConfirmation"; details: Payment } | { type: "paymentWaitingFeeAcceptance"; details: Payment } | { type: "synced" } | { type: "syncFailed"; error: string } | { type: "dataSynced"; didPullNewRecords: boolean };

export interface LnUrlInfo {
    lnAddress?: string;
    lnurlPayComment?: string;
    lnurlPayDomain?: string;
    lnurlPayMetadata?: string;
    lnurlPaySuccessAction?: SuccessActionProcessed;
    lnurlPayUnprocessedSuccessAction?: SuccessAction;
    lnurlWithdrawEndpoint?: string;
}

export type Amount = { type: "bitcoin"; amountMsat: number } | { type: "currency"; iso4217Code: string; fractionalAmount: number };

export interface LiquidAddressData {
    address: string;
    network: Network;
    assetId?: string;
    amount?: number;
    amountSat?: number;
    label?: string;
    message?: string;
}

export interface Symbol {
    grapheme?: string;
    template?: string;
    rtl?: boolean;
    position?: number;
}

export interface LnUrlWithdrawRequestData {
    callback: string;
    k1: string;
    defaultDescription: string;
    minWithdrawable: number;
    maxWithdrawable: number;
}

export interface PreparePayOnchainRequest {
    amount: PayAmount;
    feeRateSatPerVbyte?: number;
}

export interface LocalizedName {
    locale: string;
    name: string;
}

export interface PrepareRefundResponse {
    txVsize: number;
    txFeeSat: number;
    lastRefundTxId?: string;
}

export interface RestoreRequest {
    backupPath?: string;
}

export type ReceiveAmount = { type: "bitcoin"; payerAmountSat: number } | { type: "asset"; assetId: string; payerAmount?: number };

export interface AssetBalance {
    assetId: string;
    balanceSat: number;
    name?: string;
    ticker?: string;
    balance?: number;
}

export interface SendPaymentResponse {
    payment: Payment;
}

export type PaymentState = "created" | "pending" | "complete" | "failed" | "timedOut" | "refundable" | "refundPending" | "waitingFeeAcceptance";

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

export interface LnUrlPaySuccessData {
    payment: Payment;
    successAction?: SuccessActionProcessed;
}

export type AesSuccessActionDataResult = { type: "decrypted"; data: AesSuccessActionDataDecrypted } | { type: "errorStatus"; reason: string };

export type SendDestination = { type: "liquidAddress"; addressData: LiquidAddressData; bip353Address?: string } | { type: "bolt11"; invoice: LNInvoice; bip353Address?: string } | { type: "bolt12"; offer: LNOffer; receiverAmountSat: number; bip353Address?: string };

export interface AssetMetadata {
    assetId: string;
    name: string;
    ticker: string;
    precision: number;
    fiatId?: string;
}

export type InputType = { type: "bitcoinAddress"; address: BitcoinAddressData } | { type: "liquidAddress"; address: LiquidAddressData } | { type: "bolt11"; invoice: LNInvoice } | { type: "bolt12Offer"; offer: LNOffer; bip353Address?: string } | { type: "nodeId"; nodeId: string } | { type: "url"; url: string } | { type: "lnUrlPay"; data: LnUrlPayRequestData; bip353Address?: string } | { type: "lnUrlWithdraw"; data: LnUrlWithdrawRequestData } | { type: "lnUrlAuth"; data: LnUrlAuthRequestData } | { type: "lnUrlError"; data: LnUrlErrorData };

export interface AcceptPaymentProposedFeesRequest {
    response: FetchPaymentProposedFeesResponse;
}

export interface UrlSuccessActionData {
    description: string;
    url: string;
    matchesCallbackDomain: boolean;
}

export interface PayOnchainRequest {
    address: string;
    prepareResponse: PreparePayOnchainResponse;
}

export interface CreateBolt12InvoiceResponse {
    invoice: string;
}

export interface ReceivePaymentResponse {
    destination: string;
    liquidExpirationBlockheight?: number;
    bitcoinExpirationBlockheight?: number;
}

export interface ExternalInputParser {
    providerId: string;
    inputRegex: string;
    parserUrl: string;
}

export interface PrepareReceiveRequest {
    paymentMethod: PaymentMethod;
    amount?: ReceiveAmount;
}

export type SuccessActionProcessed = { type: "aes"; result: AesSuccessActionDataResult } | { type: "message"; data: MessageSuccessActionData } | { type: "url"; data: UrlSuccessActionData };

export type GetPaymentRequest = { type: "paymentHash"; paymentHash: string } | { type: "swapId"; swapId: string };

export type LnUrlWithdrawResult = { type: "ok"; data: LnUrlWithdrawSuccessData } | { type: "timeout"; data: LnUrlWithdrawSuccessData } | { type: "errorStatus"; data: LnUrlErrorData };

export interface CheckMessageResponse {
    isValid: boolean;
}

export interface BuyBitcoinRequest {
    prepareResponse: PrepareBuyBitcoinResponse;
    redirectUrl?: string;
}

export interface PrepareLnUrlPayRequest {
    data: LnUrlPayRequestData;
    amount: PayAmount;
    bip353Address?: string;
    comment?: string;
    validateSuccessActionUrl?: boolean;
}

export type SuccessAction = { type: "aes"; data: AesSuccessActionData } | { type: "message"; data: MessageSuccessActionData } | { type: "url"; data: UrlSuccessActionData };

export interface RouteHint {
    hops: RouteHintHop[];
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

export interface LnUrlWithdrawSuccessData {
    invoice: LNInvoice;
}

export interface LnUrlWithdrawRequest {
    data: LnUrlWithdrawRequestData;
    amountMsat: number;
    description?: string;
}

export interface LnOfferBlindedPath {
    blindedHops: string[];
}

export interface SendPaymentRequest {
    prepareResponse: PrepareSendResponse;
    useAssetFees?: boolean;
    payerNote?: string;
}

export interface FetchPaymentProposedFeesRequest {
    swapId: string;
}

export interface PrepareBuyBitcoinRequest {
    provider: BuyBitcoinProvider;
    amountSat: number;
}

export type LnUrlPayResult = { type: "endpointSuccess"; data: LnUrlPaySuccessData } | { type: "endpointError"; data: LnUrlErrorData } | { type: "payError"; data: LnUrlPayErrorData };

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

export type Network = "bitcoin" | "testnet" | "signet" | "regtest";

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

export interface LnUrlAuthRequestData {
    k1: string;
    action?: string;
    domain: string;
    url: string;
}

export interface LnUrlErrorData {
    reason: string;
}

export type PayAmount = { type: "bitcoin"; receiverAmountSat: number } | { type: "asset"; toAsset: string; receiverAmount: number; estimateAssetFees?: boolean; fromAsset?: string } | { type: "drain" };

export interface GetInfoResponse {
    walletInfo: WalletInfo;
    blockchainInfo: BlockchainInfo;
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

export interface AesSuccessActionData {
    description: string;
    ciphertext: string;
    iv: string;
}

export interface PreparePayOnchainResponse {
    receiverAmountSat: number;
    claimFeesSat: number;
    totalFeesSat: number;
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

export interface PrepareBuyBitcoinResponse {
    provider: BuyBitcoinProvider;
    amountSat: number;
    feesSat: number;
}

export type LnUrlCallbackStatus = { type: "ok" } | ({ type: "errorStatus" } & {} & LnUrlErrorData);

export interface AesSuccessActionDataDecrypted {
    description: string;
    plaintext: string;
}

export interface CheckMessageRequest {
    message: string;
    pubkey: string;
    signature: string;
}

export type BlockchainExplorer = { type: "esplora"; url: string; useWaterfalls: boolean };

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
