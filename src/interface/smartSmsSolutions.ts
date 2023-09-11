import { voiceOtpClasses } from "@/utils";

export interface DataProduct {
  product_name: string;
  value: string;
  validity: DataProductsValidity;
  volume: string;
  percent: string;
  fixed: string;
  [key: string]: any;
}

export type DataProductsValidity =
  | "1 Days"
  | "2 Days"
  | "7 Days"
  | "14 Days"
  | "30 Days"
  | "60 Days"
  | "90 Days"
  | "365 Days";

export interface SmartSmsSolutionsResponse {
  success: boolean;
  comment: string;
  [key: string]: any;
}

export interface GetDataPlansResponse extends SmartSmsSolutionsResponse {
  data: {
    phone: string;
    product_type: string;
    products: DataProduct[];
    [key: string]: any;
  };
}

export interface BuyDataResponse extends SmartSmsSolutionsResponse {
  data: {
    id: string;
    value: string;
    billed: string;
    balance: string;
    description: string;
    ref_id: string;
    [key: string]: any;
  };
}

export interface InboxForwarding {
  from: string;
  message: string;
  server_name: string;
  Server_number: string;
  server_token: string;
  received_time: string;
  [key: string]: any;
}

export type VoiceOtpClassTitle = keyof typeof voiceOtpClasses;

export type VoiceOtpRequest = {
  phone: string;
  otp: string;
  refId?: string;
} & (VoiceOtpRequestWithClassTitle | VoiceOtpRequestWithClassCode);

export type VoiceOtpRequestWithClassTitle = {
  classTitle: VoiceOtpClassTitle;
  classCode?: null;
};

export type VoiceOtpRequestWithClassCode = {
  classCode: string;
  classTitle?: null;
};

export interface VoiceOtpRequestResponse extends SmartSmsSolutionsResponse {
  log_id: string;
  ref_id: string;
  [key: string]: any;
}

export interface SmsOtpRequestResponse extends VoiceOtpRequestResponse {
  ref_id: string;
}

export interface VoiceOtpStatus {
  logId?: string;
  refId?: string;
}

export interface VoiceOtpStatusResponse extends SmartSmsSolutionsResponse {
  dlr_status: string;
  dlr_comment: string;
  bill: string;
  phone: string;
  wallet_before: string;
  wallet_after: string;
  submitted: string;
  sent: string;
  done: string;
  log_id: string;
  ref_id: string;
}

export interface SendSmsResponse {
  code: number;
  successful: string;
  basic_successful: string;
  corp_successful: string;
  simserver_successful: string;
  simserver_shared: string;
  simserver_failed: string;
  simserver_distribution: any[]; // You can specify a more specific type if needed
  failed: string;
  flooding: string;
  insufficient_unit: string;
  invalid: string;
  all_numbers: string;
  nondnd_numbers: string;
  dnd_numbers: string;
  units_used: number;
  units_calculated: number;
  basic_units: number;
  corp_units: number;
  units_before: string;
  units_after: string;
  sms_pages: number;
  simhost: string;
  message_id: string;
  ref_id: string;
  comment: string;
  error?: boolean;
}
