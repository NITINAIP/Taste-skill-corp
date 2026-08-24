/**
 * ข้อมูลจำลอง (MOCK DATA) - ต้องเปลี่ยนก่อนขึ้นระบบจริง
 *
 * เลขที่ใบอนุญาต เลขทะเบียนนิติบุคคล ที่อยู่ เบอร์โทรศัพท์ อีเมล และไลน์ไอดี
 * ในไฟล์นี้เป็นข้อมูลสมมติทั้งหมด สร้างขึ้นเพื่อใช้กับเว็บไซต์ตัวอย่างเท่านั้น
 * ห้ามนำเลขใบอนุญาตชุดนี้ขึ้นเว็บไซต์จริง ให้แทนที่ด้วยข้อมูลที่ออกโดย
 * สำนักงานคณะกรรมการกำกับและส่งเสริมการประกอบธุรกิจประกันภัย (คปภ.) ก่อนเผยแพร่
 */

export type Branch = {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
};

export type Social = {
  label: string;
  href: string;
};

export type Company = {
  legalName: string;
  shortName: string;
  latinName: string;
  tagline: string;
  foundedYear: number;
  licence: {
    number: string;
    regulator: string;
    issuedYear: number;
  };
  registeredCapital: string;
  registrationNumber: string;
  phone: string;
  phoneHref: string;
  email: string;
  lineId: string;
  address: string;
  officeHours: string;
  socials: Social[];
};

export const company: Company = {
  legalName: "บริษัท อารักษ์ อินชัวรันส์ โบรกเกอร์ จำกัด",
  shortName: "อารักษ์ โบรกเกอร์",
  latinName: "ARAK Insurance Broker",
  tagline: "นายหน้าประกันภัยที่อยู่ข้างคุณ",
  foundedYear: 2549,
  licence: {
    number: "ว00184/2549",
    regulator: "สำนักงานคณะกรรมการกำกับและส่งเสริมการประกอบธุรกิจประกันภัย (คปภ.)",
    issuedYear: 2549,
  },
  registeredCapital: "10,000,000 บาท ชำระเต็มจำนวน",
  registrationNumber: "0105549041872",
  phone: "02 118 4700",
  phoneHref: "tel:+6621184700",
  email: "contact@arakbroker.co.th",
  lineId: "@arakbroker",
  address:
    "เลขที่ 219 อาคารรัชดา บิสซิเนส ทาวเวอร์ ชั้น 12 ถนนรัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพมหานคร 10400",
  officeHours: "จันทร์ถึงศุกร์ 08.30 ถึง 17.30 น. เสาร์ 09.00 ถึง 12.00 น.",
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/arakbroker" },
    { label: "LINE", href: "https://line.me/R/ti/p/@arakbroker" },
    { label: "YouTube", href: "https://www.youtube.com/@arakbroker" },
  ],
};

export const branches: Branch[] = [
  {
    id: "bangkok",
    name: "สำนักงานใหญ่ ดินแดง",
    address:
      "เลขที่ 219 อาคารรัชดา บิสซิเนส ทาวเวอร์ ชั้น 12 ถนนรัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพมหานคร 10400",
    phone: "02 118 4700",
    hours: "จันทร์ถึงศุกร์ 08.30 ถึง 17.30 น. เสาร์ 09.00 ถึง 12.00 น.",
  },
  {
    id: "chiangmai",
    name: "สาขาเชียงใหม่",
    address:
      "เลขที่ 88/4 ถนนมหิดล ตำบลหายยา อำเภอเมืองเชียงใหม่ จังหวัดเชียงใหม่ 50100",
    phone: "053 271 880",
    hours: "จันทร์ถึงศุกร์ 08.30 ถึง 17.30 น. เสาร์ 09.00 ถึง 12.00 น.",
  },
  {
    id: "khonkaen",
    name: "สาขาขอนแก่น",
    address:
      "เลขที่ 356 หมู่ 12 ถนนมิตรภาพ ตำบลในเมือง อำเภอเมืองขอนแก่น จังหวัดขอนแก่น 40000",
    phone: "043 246 115",
    hours: "จันทร์ถึงศุกร์ 08.30 ถึง 17.30 น.",
  },
  {
    id: "hatyai",
    name: "สาขาหาดใหญ่",
    address:
      "เลขที่ 41 ถนนราษฎร์ยินดี ตำบลหาดใหญ่ อำเภอหาดใหญ่ จังหวัดสงขลา 90110",
    phone: "074 224 903",
    hours: "จันทร์ถึงศุกร์ 08.30 ถึง 17.30 น.",
  },
];
