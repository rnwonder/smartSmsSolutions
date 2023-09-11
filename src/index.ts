import axios, { AxiosInstance } from "axios";
import {
  createFormData,
  getRefId,
  sortBySMEFirst,
  voiceOtpClasses,
} from "@/utils";
import {
  BuyDataResponse,
  GetDataPlansResponse,
  SendSmsResponse,
  SmartSmsSolutionsResponse,
  SmsOtpRequestResponse,
  VoiceOtpRequest,
  VoiceOtpRequestResponse,
  VoiceOtpStatus,
  VoiceOtpStatusResponse,
} from "@/interface/smartSmsSolutions";

class Index {
  private $http: AxiosInstance;

  constructor(api_key: string) {
    this.$http = axios.create({
      baseURL: "https://app.smartsmssolutions.com/io/api/client/v1",
    });

    this.$http.interceptors.request.use((config) => {
      if (
        config.method === "GET" ||
        config.method === "get" ||
        config.method === "delete" ||
        config.method === "DELETE"
      ) {
        config.params = {
          ...config.params,
          token: api_key,
        };
      } else {
        if (config.data instanceof FormData) {
          config.data.append("token", api_key || "");
        } else {
          config.data = {
            ...config.data,
            token: api_key,
          };
          config.data = createFormData(config.data);
        }
      }
      return config;
    });
  }

  public async getBalance(): Promise<number> {
    try {
      const res = await this.$http.get("/balance/");
      return res.data;
    } catch (error: any) {
      throw error.response || error;
    }
  }

  public async getDataProductList(
    phone: string,
    sort?: "SME"
  ): Promise<GetDataPlansResponse> {
    try {
      const res = await this.$http.get(
        "/internet_data/products/?phone=" + phone
      );
      return {
        ...res?.data,
        data: {
          ...res?.data?.data,
          products:
            sort === "SME"
              ? res?.data?.data?.products.sort(sortBySMEFirst)
              : res?.data?.data?.products,
        },
      };
    } catch (error: any) {
      throw error.response || error;
    }
  }

  public async buyInternetData({
    phone,
    productName,
    refId,
  }: {
    phone: string;
    productName: string;
    refId?: string;
  }): Promise<BuyDataResponse> {
    try {
      const payload = {
        phone,
        product_name: productName,
        ref_id: getRefId(refId),
      };

      const res = await this.$http.post("/internet_data/buy/", payload);
      return res.data;
    } catch (error: any) {
      throw error.response || error;
    }
  }

  public async buyAirtime({
    amount,
    refId,
    phone,
  }: {
    phone: string;
    amount: string;
    refId?: string;
  }): Promise<BuyDataResponse> {
    try {
      const payload = {
        phone,
        amount,
        ref_id: getRefId(refId),
      };
      const res = await this.$http.post("/airtime/buy/", payload);
      return res.data;
    } catch (error: any) {
      throw error.response || error;
    }
  }

  /**
   * classTitle and classCode are mutually exclusive use one or the other.
   *
   * classTitle is the title of the voice otp class. e.g. THREE_DIGITS_ONCE. this inputs the class code for you.
   *
   * classCode is the code of the voice otp class. e.g. B1DXW4V8YA. Here you have to input the class code yourself.
   */
  public async voiceOtpRequest({
    otp,
    refId,
    phone,
    classTitle,
    classCode,
  }: VoiceOtpRequest): Promise<VoiceOtpRequestResponse> {
    try {
      const payload = {
        phone,
        otp,
        ref_id: getRefId(refId),
        ...(classTitle && { class: voiceOtpClasses[classTitle] }),
        ...(classCode && { class: classCode }),
      };
      const res = await this.$http.post("voiceotp/send/", payload);
      return res.data;
    } catch (error: any) {
      throw error.response || error;
    }
  }

  public async voiceOtpDeliveryStatus({
    refId,
    logId,
  }: VoiceOtpStatus): Promise<VoiceOtpStatusResponse> {
    try {
      const params = new URLSearchParams({
        ...(refId && { ref_id: refId }),
        ...(logId && { log_id: logId }),
      });
      const res = await this.$http.get("voiceotp/status/?" + params.toString());
      return res.data;
    } catch (error: any) {
      throw error.response || error;
    }
  }

  public async sendSmsOtp({
    otp,
    appNameCode,
    templateCode,
    senderId,
    refId,
    phone,
  }: {
    phone: string;
    otp: string;
    senderId: string;
    appNameCode: string;
    templateCode: "7153792424" | "8572196532" | string;
    refId?: string;
  }): Promise<SmsOtpRequestResponse> {
    try {
      const payload = {
        phone,
        otp,
        sender: senderId,
        app_name_code: appNameCode,
        template_code: templateCode,
        ref_id: getRefId(refId),
      };
      const res = await this.$http.post("smsotp/send/", payload);
      return res.data;
    } catch (error: any) {
      throw error.response || error;
    }
  }

  /**
   *
   * type defaults to 0
   *
   * routing defaults to 3
   *
   */
  public async sendSms({
    refId,
    senderId,
    routing,
    to,
    dirTimeout,
    schedule,
    simServerToken,
    type,
    message,
  }: {
    senderId: string;
    to: string;
    message: string;
    type?: "0" | "1" | "2" | "6" | string;
    routing?: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | string;
    refId?: string;
    simServerToken?: string;
    dirTimeout?: string;
    schedule?: string;
  }): Promise<SendSmsResponse> {
    try {
      const payload = {
        sender: senderId,
        routing: routing || "3",
        to,
        dir_timeout: dirTimeout,
        schedule,
        simserver_token: simServerToken,
        type: type || "0",
        message,
        ref_id: getRefId(refId),
      };
      const res = await this.$http.post("sms/", payload);
      return res.data;
    } catch (error: any) {
      throw error.response || error;
    }
  }

  public async submitSenderId({
    senderId,
    address,
    registrationNumber,
    organizationName,
    message,
  }: {
    senderId: string;
    message: string;
    organizationName: string;
    registrationNumber: string;
    address: string;
  }): Promise<SmartSmsSolutionsResponse> {
    try {
      const payload = {
        senderid: senderId,
        address,
        regno: registrationNumber,
        organization: organizationName,
        message,
      };
      const res = await this.$http.post("senderid/create/", payload);
      return res.data;
    } catch (error: any) {
      throw error.response || error;
    }
  }

  public async getPhoneInfo({
    phone,
    type,
  }: {
    phone: string;
    type: "0" | "1" | "2" | "3" | string;
  }): Promise<SmartSmsSolutionsResponse & { data: any }> {
    try {
      const params = new URLSearchParams({
        phone,
        type,
      });
      const res = await this.$http.get("phone/info/?" + params.toString());
      return res.data;
    } catch (error: any) {
      throw error.response || error;
    }
  }
}

export default Index;
