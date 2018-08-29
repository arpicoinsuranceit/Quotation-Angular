import { personalInfo, personalInfoDTA } from "./personalInfo";
import { RiderDetails, CalPersonalInfo, CalPersonalInfoDta } from "./quoCal";

export class InvpSaveQuotation{
    _personalInfo : personalInfo;
    _riderDetails : RiderDetails;
    _calPersonalInfo : CalPersonalInfo;
}

export class DtaSaveQuotation{
    _personalInfo : personalInfoDTA;
    _riderDetails : RiderDetails;
    _calPersonalInfo : CalPersonalInfoDta;
}