import apiClient from "./apiClient";
import {
  AuthResponse,
  LoginInput,
  Master,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../../lib/types/member";
import { MemberType } from "../../lib/enums/member.enum";

class MemberService {
  public async getBarber(): Promise<Member> {
    try {
      const { data } = await apiClient.get<Member>("/member/barber");
      return data;
    } catch (err) {
      console.error("MemberService.getBarber:", err);
      throw err;
    }
  }

  public async getTopUsers(): Promise<Member[]> {
    try {
      const { data } = await apiClient.get<Member[]>("/member/top-users");
      return data;
    } catch (err) {
      console.error("MemberService.getTopUsers:", err);
      throw err;
    }
  }

  public async signup(input: MemberInput): Promise<Member> {
    try {
      const { data } = await apiClient.post<AuthResponse>(
        "/member/signup",
        input
      );
      const member = data.member;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.error("MemberService.signup:", err);
      throw err;
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    try {
      const { data } = await apiClient.post<AuthResponse>(
        "/member/login",
        input
      );
      const member = data.member;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.error("MemberService.login:", err);
      throw err;
    }
  }

  public async logout(): Promise<void> {
    try {
      await apiClient.post("/member/logout", {});
    } catch (err) {
      console.error("MemberService.logout:", err);
      throw err;
    } finally {
      localStorage.removeItem("memberData");
    }
  }

  public async getMemberDetail(): Promise<Member> {
    try {
      const { data } = await apiClient.get<Member>("/member/detail");
      localStorage.setItem("memberData", JSON.stringify(data));
      return data;
    } catch (err) {
      console.error("MemberService.getMemberDetail:", err);
      throw err;
    }
  }

  public async updateMember(input: MemberUpdateInput): Promise<Member> {
    try {
      const formData = new FormData();

      if (input.memberNick) formData.append("memberNick", input.memberNick);
      if (input.memberPhone) formData.append("memberPhone", input.memberPhone);
      if (input.memberAddress)
        formData.append("memberAddress", input.memberAddress);
      if (input.memberDesc) formData.append("memberDesc", input.memberDesc);
      if (input.memberImage instanceof File)
        formData.append("memberImage", input.memberImage);

      const { data } = await apiClient.post<Member>("/member/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      localStorage.setItem("memberData", JSON.stringify(data));
      return data;
    } catch (err) {
      console.error("MemberService.updateMember:", err);
      throw err;
    }
  }

  public async getMasters(): Promise<Master[]> {
    try {
      const { data } = await apiClient.get<Master[]>("/member/masters");
      return Array.isArray(data)
        ? data.filter((m) => m.memberType === MemberType.MASTER)
        : [];
    } catch (err) {
      console.warn(
        "MemberService.getMasters: /member/masters is not available — see BACKEND-NOTES.md",
        err
      );
      return [];
    }
  }
}

export default MemberService;
