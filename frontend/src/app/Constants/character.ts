import { Character } from '../Enum/character';
import { ICharacter } from '../Types/Character';

export const characterMockData: ICharacter[] = [
  {
    bgLink: 'images/purple-bg-full.png',
    characterNameEn: Character.SHINY,
    characterNameTh: 'ผู้ทรงปัญญา',
    characterTitle: '“ถ้าเธอกำลังหลงทาง เราจะสร้างเข็มทิศให้เธอเอง”',
    characterImgLink: 'images/character-shiny.png',
    characterDescription:
      'แสงของเธอทำให้สังคม…หลุดพ้นจากความมืดมิด ความรอบรู้จะจุดประกายให้ค้นพบสิ่งใหม่ และเป็นผู้นำในการค้นหาทางออกที่ดีที่สุด',
    characterAttributes: [
      'ค้นคว้า สะสมข้อมูล',
      'มีพื้นที่ส่วนตัวในชีวิต',
      'สร้างสิ่งใหม่ที่แตกต่าง',
      'คิดวิเคราะห์ วางแผน',
      'รักการพัฒนาตัวเอง',
    ],
    attributesChipColor: 'bg-[#b491d9]',
    shinningMethod:
      '“ส่องแสงของเธอด้วยการแชร์ Life Hack สุดพิเศษหรือแนวคิดที่น่าสนใจเกี่ยวกับการใช้ชีวิตที่แปลกใหม่! เช่น ตื่นอย่างไรให้ไปทำงานทัน! (＠｀o´＠)/”',
  },
  {
    bgLink: 'images/blue-bg-full.png',
    characterNameEn: Character.TECTOR,
    characterNameTh: 'ผู้มีแบบแผน',
    characterTitle: '“แม้ทางที่เดินจะมืดมน แต่เธอไม่ต้องกังวลเพราะมีเราไปด้วย”',
    characterImgLink: 'images/character-tector.png',
    characterDescription:
      'แสงของเธอทำให้สังคม…ไม่เคยถูกทอดทิ้ง เป็นผู้ผดุงความยุติธรรม รักษาสังคมไม่ให้มีวันเสื่อมถอย ด้วยการบริหารจัดการ และทุ่มเทอย่างสุดกำลัง',
    characterAttributes: [
      'ทำงานเป็นระบบ มีมาตรฐาน',
      'ซื่อสัตย์ รักความถูกต้อง',
      'มีวินัย ตรงเวลา ทำตามกฏ',
      'รอบคอบ สม่ำเสมอ',
      'หนักแน่น ชัดเจน',
    ],
    attributesChipColor: 'bg-[#355dbd]',
    shinningMethod:
      '“ส่องแสงของเธอด้วยการสร้างความเชื่อมั่นให้คนรอบข้างเชื่อว่าการทำตามแบบแผนที่กำหนดไว้ก็สามารถใช้ชีวิตอย่างสนุกได้! …หากแยกขยะได้ทุกชิ้นจะเป็นยังไงกันนะ!? (*´O｀*)”',
  },
  {
    bgLink: 'images/red-bg-full.png',
    characterNameEn: Character.PLUCKY,
    characterNameTh: 'ผู้กล้าหาญ',
    characterTitle: '“อุปสรรคจะมากขนาดไหน ขอให้เธอมั่นใจแล้วไปกับเรา”',
    characterImgLink: 'images/character-plucky.png',
    characterDescription:
      'แสงของเธอทำให้สังคม…มองเห็นอนาคตที่หายไป สร้างแรงบันดาลใจตัดสินใจเดินตามเป้าหมาย และเธอยังเป็นผู้นำที่ปกป้องทุกคนให้พ้นภัย',
    characterAttributes: [
      'ผู้ริเริ่ม กล้าหาญ บุกเบิก',
      'ความสามารถในการแก้ปัญหาเฉพาะหน้า',
      'มุ่งมั่น รักความก้าวหน้า',
      'ชอบแข่งขัน ตรงไปตรงมา',
      'เป้าหมายชัด เป็นผู้นำ มองภาพรวม',
    ],
    attributesChipColor: 'bg-[#eb4d3d]',
    shinningMethod:
      '“ส่องแสงของเธอด้วยการเป็นคนแรกที่พาทุกคนเปลี่ยนแปลงสังคม!ดูนั่นสิ! Food wasted เริ่มเยอะแล้ว ช่วยกินข้าวเพื่อนให้หมดกัน! Ψ(￣∇￣)Ψ”',
  },
  {
    bgLink: 'images/yellow-bg-full.png',
    characterNameEn: Character.PEACY,
    characterNameTh: 'ผู้กลมเกลียว',
    characterTitle:
      '“เราจะเป็นมิตรกับคนทั้งกาแลคซี่ และเป็นความแฮปปี้ให้เธอด้วย”',
    characterImgLink: 'images/character-peacy.png',
    characterDescription:
      'แสงของเธอทำให้สังคม…รวมเป็นหนึ่งเดียว เป็นผู้ไกล่เกลี่ยชั้นเยี่ยม เห็นใจ รู้ใจ เข้าใจ เสมือนว่าเป็นเขา ทำให้ทุกคนยอมรับ เป็นผู้ให้ที่สังคมขาดไม่ได้เลยทีเดียว',
    characterAttributes: [
      'เป็นมิตร ร่าเริง เป็นกันเอง',
      'ใจกว้าง โอบอ้อมอารี',
      'เป็นผู้ฟังที่ดี เข้าใจผู้อื่น',
      'มองโลกในแง่ดี เสียสละ',
      'นักสร้างความสัมพันธ์ เอาใจใส่คนรอบข้าง',
    ],
    attributesChipColor: 'bg-[#ffd76b]',
    shinningMethod:
      '“ส่องแสงของเธอด้วยการส่งต่อความสดใสให้คนรอบข้าง! เริ่มจากส่งข้อความให้กำลังใจไปยังเพื่อนสนิทให้เขาช็อคไปเลยเป็นไง? ٩(◕‿◕｡)۶ ”',
  },
  {
    bgLink: 'images/orange-bg-full.png',
    characterNameEn: Character.DREAMY,
    characterNameTh: 'ผู้สุนทรีย์',
    characterTitle: '“ทุกสิ่งที่เธอฝัน เราจะช่วยทำมันให้เป็นจริง”',
    characterImgLink: 'images/character-dreamy.png',
    characterDescription:
      'แสงของเธอทำให้สังคม…เชื่อว่าทุกฝันเกิดขึ้นได้จริง ทุกปัญหาจะแก้ไขได้ เธอคลายทุกความกังวล และเปลี่ยนเป็นความสดใสพร้อมกับสิ่งใหม่ที่กำลังจะเกิดขึ้น',
    characterAttributes: [
      'โดดเด่น มีเสน่ห์',
      'รักอิสระ มองโลกในแง่ดี',
      'สร้างสรรค์ ช่างจินตนาการ',
      'มีมนุษยสัมพันธ์ เข้ากับคนง่าย',
      'แก้ไขปัญหาเฉพาะหน้าได้ดี กระตือรือร้น',
    ],
    attributesChipColor: 'bg-[#ef8923]',
    shinningMethod:
      '“ส่องแสงของเธอด้วยการปรับนิดเปลี่ยนหน่อยสิ่งของที่เธอมีให้กลายเป็นไอเดียใหม่ที่น่าสนใจ! เอาเสื้อผ้าในตู้มา match ใหม่ ให้กลายเป็น new look ดูสิ! (๑˃ᴗ˂)ﻭ ”',
  },
  {
    bgLink: 'images/green-bg-full.png',
    characterNameEn: Character.MEKKA,
    characterNameTh: 'ผู้จริงใจ',
    characterTitle:
      '“คนน่ารักที่เธอบอกว่าน่ากอด เค้าซัพพอร์ตเธอได้เท่าเรามั้ย”',
    characterImgLink: 'images/character-mekka.png',
    characterDescription:
      'แสงของเธอทำให้สังคม…ไม่ขาดแคลนคนทำจริง มีความหวัง รู้สึกปลอดภัยในทุกการกระทำเพราะเธอจะคอยรับฟัง เป็นที่พึ่ง และซัพพอร์ตทุกคนด้วยความเข้าใจเสมอ',
    characterAttributes: [
      'นักสนับสนุน และช่วยเหลือทุกคน',
      'สุภาพ อ่อนน้อมถ่อมตน',
      'มีความประนีประนอม',
      'อดทน รับฟังคนอื่นได้ดี',
      'รักสงบ ชื่นชอบความเรียบง่าย',
    ],
    attributesChipColor: 'bg-[#50eac6]',
    shinningMethod:
      '“ส่องแสงของเธอด้วยการส่งต่อความช่วยเหลือของเธอไปยังทุกคนที่เธอสามารถช่วยได้! เริ่มจากแบ่งขนมอร่อยๆ ให้คุณน้าข้างบ้านที่ชอบมาเม้ากับแม่เราดูสิ!  ᕕ( ᐛ )ᕗ ”',
  },
];
