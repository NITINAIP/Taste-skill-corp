import type { useAgentContent } from "@/hooks/use-site-content"

/**
 * หน้านี้อ่านข้อมูลชุดเดียวกันทั้งหกส่วน จึงเรียกฮุกครั้งเดียวที่ไฟล์เพจ
 * แล้วส่งทรัพยากรก้อนนี้ลงไป แต่ละส่วนยังคงจัดการสถานะกำลังโหลดและผิดพลาดของตัวเอง
 * ผ่าน AsyncBoundary ที่มีโครงร่างเหมือนเนื้อหาส่วนนั้นจริง
 */
export type AgentContentResource = ReturnType<typeof useAgentContent>
