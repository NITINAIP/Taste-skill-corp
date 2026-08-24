/**
 * ทะเบียนช่องภาพทั้งหมดของเว็บไซต์
 *
 * ทุกภาพบนเว็บไซต์นี้เป็นภาพชั่วคราวที่สร้างขึ้นแบบกำหนดค่าตายตัวจากค่า seed
 * ยังไม่มีภาพถ่ายจริงของบริษัท สาขา หรือผู้บริหาร
 * ช่อง brief คือโจทย์ภาพถ่ายที่ต้องใช้แทนที่ก่อนเผยแพร่จริง
 * ภาพบุคคลทุกช่องต้องได้รับความยินยอมจากผู้ถูกถ่ายก่อนนำขึ้นเว็บไซต์
 */

export type MediaSlot = {
  id: string;
  ratio: [number, number];
  brief: string;
  seed: string;
};

export const mediaSlots: Record<string, MediaSlot> = {
  "home-hero": {
    id: "home-hero",
    ratio: [4, 5],
    brief:
      "เจ้าหน้าที่นายหน้ากางตารางเปรียบเทียบความคุ้มครองให้ลูกค้าคู่หนึ่งดูบนโต๊ะประชุมริมหน้าต่าง แสงธรรมชาติ ไม่จัดท่าแบบภาพสต็อก",
    seed: "arak-hero-consult-desk",
  },
  "home-agent-band": {
    id: "home-agent-band",
    ratio: [16, 9],
    brief:
      "นายหน้ารุ่นใหม่นั่งคุยกับหัวหน้าทีมในมุมทำงานของออฟฟิศ มีจอแสดงหน้าจอเทียบเบี้ยอยู่ด้านหลังแบบเบลอ",
    seed: "arak-agent-band-mentor",
  },
  "product-motor": {
    id: "product-motor",
    ratio: [3, 2],
    brief:
      "เจ้าหน้าที่สำรวจภัยถ่ายรูปรอยบุบท้ายรถเก๋งในลานจอดตอนบ่าย เห็นมือถือกับใบตรวจสภาพในมือ",
    seed: "arak-motor-survey-dent",
  },
  "product-compulsory-motor": {
    id: "product-compulsory-motor",
    ratio: [3, 2],
    brief:
      "เอกสารกรมธรรม์และเล่มทะเบียนรถวางบนเคาน์เตอร์บริการ มือเจ้าหน้าที่ชี้ตำแหน่งวันหมดอายุความคุ้มครอง",
    seed: "arak-compulsory-counter-doc",
  },
  "product-health": {
    id: "product-health",
    ratio: [3, 2],
    brief:
      "ลูกสาววัยทำงานพาแม่มานั่งคุยกับเจ้าหน้าที่เรื่องแผนสุขภาพ บรรยากาศเป็นการอธิบายเอกสาร ไม่ใช่ภาพในโรงพยาบาล",
    seed: "arak-health-family-review",
  },
  "product-personal-accident": {
    id: "product-personal-accident",
    ratio: [3, 2],
    brief:
      "ช่างเทคนิคสวมอุปกรณ์นิรภัยยืนที่หน้างานติดตั้ง สื่อถึงการแบ่งชั้นอาชีพในการคิดเบี้ยประกันอุบัติเหตุ",
    seed: "arak-pa-technician-site",
  },
  "product-home-fire": {
    id: "product-home-fire",
    ratio: [3, 2],
    brief:
      "บ้านเดี่ยวชั้นเดียวในหมู่บ้านชานเมืองช่วงเช้า เห็นตัวบ้าน รั้ว และมิเตอร์ไฟฟ้าชัดเจนแบบภาพสำรวจภัย",
    seed: "arak-home-fire-suburban",
  },
  "product-travel": {
    id: "product-travel",
    ratio: [3, 2],
    brief:
      "ผู้เดินทางตรวจเอกสารกรมธรรม์บนมือถือที่โถงผู้โดยสารขาออก มีกระเป๋าเดินทางอยู่ข้างตัว",
    seed: "arak-travel-departure-check",
  },
  "product-sme": {
    id: "product-sme",
    ratio: [3, 2],
    brief:
      "เจ้าของร้านวัสดุก่อสร้างยืนตรวจสต๊อกในโกดังหลังร้านกับเจ้าหน้าที่ประเมินความเสี่ยง",
    seed: "arak-sme-stock-walkthrough",
  },
  "product-cargo": {
    id: "product-cargo",
    ratio: [3, 2],
    brief:
      "การขนถ่ายพาเลตสินค้าขึ้นรถบรรทุกที่ท่ารับส่งสินค้าตอนเช้า เห็นการรัดสายและการบรรจุหีบห่อ",
    seed: "arak-cargo-loading-bay",
  },
  "about-office": {
    id: "about-office",
    ratio: [16, 9],
    brief:
      "ภาพมุมกว้างของออฟฟิศสำนักงานใหญ่ในเวลาทำงานปกติ เห็นทีมสินไหมรับโทรศัพท์อยู่หลายโต๊ะ",
    seed: "arak-about-office-floor",
  },
  "about-story": {
    id: "about-story",
    ratio: [4, 5],
    brief:
      "ภาพแนวตั้งของผู้ร่วมก่อตั้งยืนอยู่ในห้องเก็บแฟ้มกรมธรรม์เก่า สื่อถึงการทำงานต่อเนื่องมาตั้งแต่ปี 2549",
    seed: "arak-about-story-archive",
  },
  "agent-hero": {
    id: "agent-hero",
    ratio: [16, 9],
    brief:
      "ห้องอบรมเตรียมสอบใบอนุญาตนายหน้า ผู้เข้าอบรมหลายวัยนั่งฟังวิทยากรที่ยืนอธิบายหน้าห้อง",
    seed: "arak-agent-hero-training",
  },
  "leader-1": {
    id: "leader-1",
    ratio: [1, 1],
    brief:
      "ภาพบุคคลครึ่งตัวของประธานเจ้าหน้าที่บริหาร แสงนุ่มด้านข้าง พื้นหลังเรียบสีเข้ม ท่าทางเป็นธรรมชาติ",
    seed: "arak-leader-nattapong",
  },
  "leader-2": {
    id: "leader-2",
    ratio: [1, 1],
    brief:
      "ภาพบุคคลครึ่งตัวของกรรมการผู้จัดการ ใช้แสงและพื้นหลังชุดเดียวกับผู้บริหารคนอื่นเพื่อให้กริดดูเป็นชุดเดียว",
    seed: "arak-leader-pimlada",
  },
  "leader-3": {
    id: "leader-3",
    ratio: [1, 1],
    brief:
      "ภาพบุคคลครึ่งตัวของผู้อำนวยการฝ่ายสินไหมทดแทน แสงและพื้นหลังชุดเดียวกับผู้บริหารคนอื่น",
    seed: "arak-leader-chaiwat",
  },
  "leader-4": {
    id: "leader-4",
    ratio: [1, 1],
    brief:
      "ภาพบุคคลครึ่งตัวของผู้อำนวยการฝ่ายพัฒนาช่องทางนายหน้า แสงและพื้นหลังชุดเดียวกับผู้บริหารคนอื่น",
    seed: "arak-leader-siraprapha",
  },
  "testimonial-1": {
    id: "testimonial-1",
    ratio: [1, 1],
    brief:
      "ภาพเจ้าของร้านอะไหล่ยนต์ในร้านของตัวเอง ถ่ายแบบสารคดี ไม่ใช่ภาพโปรไฟล์ในสตูดิโอ",
    seed: "arak-testimonial-thanakrit",
  },
  "testimonial-2": {
    id: "testimonial-2",
    ratio: [1, 1],
    brief:
      "ภาพผู้จัดการโรงงานแปรรูปอาหารยืนที่ทางเดินของโรงงาน สวมชุดตามระเบียบความปลอดภัยของพื้นที่",
    seed: "arak-testimonial-orawan",
  },
  "testimonial-3": {
    id: "testimonial-3",
    ratio: [1, 1],
    brief:
      "ภาพครูโรงเรียนมัธยมที่ระเบียงอาคารเรียนช่วงพักกลางวัน สีหน้าผ่อนคลาย แสงธรรมชาติ",
    seed: "arak-testimonial-parichat",
  },
  "contact-office": {
    id: "contact-office",
    ratio: [16, 9],
    brief:
      "ภาพหน้าอาคารสำนักงานใหญ่จากทางเข้าถนนรัชดาภิเษก ใช้เป็นภาพอ้างอิงตำแหน่งสำหรับหน้าติดต่อเรา",
    seed: "arak-contact-building-front",
  },
};
