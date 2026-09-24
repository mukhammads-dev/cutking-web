import {
  MemberExperience,
  MemberSpecialty,
  MemberStatus,
  MemberType,
} from "../enums/member.enum";

export interface Member {
  _id: string;
  memberType: MemberType;
  memberStatus: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints: number;
  memberSpecialty?: MemberSpecialty;
  memberExperience?: MemberExperience;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberInput {
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints?: number;
}

export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}

export interface MemberUpdateInput {
  memberNick?: string;
  memberPhone?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: File | string;
}

export interface AuthResponse {
  member: Member;
  accessToken: string;
}

export type Master = Member;

export interface MasterInquiry {
  page: number;
  limit: number;
  specialty?: MemberSpecialty;
}
