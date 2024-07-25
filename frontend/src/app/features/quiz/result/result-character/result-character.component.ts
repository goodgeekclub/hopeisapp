import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { SharedModule } from '../../../../shared/shared.module';
import { Character } from '../../../../Enum/character';
import { CharacterAttributesComponent } from './character-attributes/character-attributes.component';

@Component({
  selector: 'app-result-character',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    SvgIconComponent,
    CharacterAttributesComponent,
  ],
  templateUrl: './result-character.component.html',
  styleUrl: './result-character.component.css',
})
export class ResultCharacterComponent {
  @Input() public character!: Character;

  public bgLink = '';
  public characterNameEn = '';
  public characterNameTh = '';
  public characterTitle = '';
  public characterImgLink = '';
  public characterDescription = '';
  public characterAttributes: string[] = [];
  public attributesChipColor = '';
  public shinningMethod = '';

  ngOnInit(): void {
    this.setCharacterInfo();
  }

  private setCharacterInfo(): void {
    switch (this.character) {
      case Character.SHINY:
        this.bgLink = 'images/purple-bg-full.png';
        this.characterNameEn = 'Shiny';
        this.characterNameTh = 'ผู้ทรงปัญญา';
        this.characterTitle = '“ถ้าเธอกำลังหลงทาง เราจะสร้างเข็มทิศให้เธอเอง”';
        this.characterImgLink = 'images/character-shiny.png';
        this.characterDescription =
          'แสงของเธอทำให้สังคม…หลุดพ้นจากความมืดมิด ความรอบรู้จะจุดประกายให้ค้นพบสิ่งใหม่ และเป็นผู้นำในการค้นหาทางออกที่ดีที่สุด';
        this.characterAttributes = [
          'ค้นคว้า สะสมข้อมูล',
          'มีพื้นที่ส่วนตัวในชีวิต',
          'สร้างสิ่งใหม่ที่แตกต่าง',
          'คิดวิเคราะห์ วางแผน',
          'รักการพัฒนาตัวเอง',
        ];
        this.attributesChipColor = 'bg-[#b491d9]';
        this.shinningMethod =
          '“ส่องแสงของเธอด้วยการแชร์ Life Hack สุดพิเศษหรือแนวคิดที่น่าสนใจเกี่ยวกับการใช้ชีวิตที่แปลกใหม่! เช่น ตื่นอย่างไรให้ไปทำงานทัน! (＠｀o´＠)/”';
        break;
      case Character.TECTOR:
        this.bgLink = 'images/blue-bg-full.png';
        this.characterNameEn = 'Tector';
        this.characterNameTh = 'ผู้มีแบบแผน';
        this.characterTitle =
          '“แม้ทางที่เดินจะมืดมน แต่เธอไม่ต้องกังวลเพราะมีเราไปด้วย”';
        this.characterImgLink = 'images/character-tector.png';
        this.characterDescription =
          'แสงของเธอทำให้สังคม…ไม่เคยถูกทอดทิ้ง เป็นผู้ผดุงความยุติธรรม รักษาสังคมไม่ให้มีวันเสื่อมถอย ด้วยการบริหารจัดการ และทุ่มเทอย่างสุดกำลัง';
        this.characterAttributes = [
          'ทำงานเป็นระบบ มีมาตรฐาน',
          'ซื่อสัตย์ รักความถูกต้อง',
          'มีวินัย ตรงเวลา ทำตามกฏ',
          'รอบคอบ สม่ำเสมอ',
          'หนักแน่น ชัดเจน',
        ];
        this.attributesChipColor = 'bg-[#355dbd]';
        this.shinningMethod =
          '“ส่องแสงของเธอด้วยการสร้างความเชื่อมั่นให้คนรอบข้างเชื่อว่าการทำตามแบบแผนที่กำหนดไว้ก็สามารถใช้ชีวิตอย่างสนุกได้! …หากแยกขยะได้ทุกชิ้นจะเป็นยังไงกันนะ!? (*´O｀*)”';
        break;
      case Character.PLUCKY:
        this.bgLink = 'images/red-bg-full.png';
        this.characterNameEn = 'Plucky';
        this.characterNameTh = 'ผู้กล้าหาญ';
        this.characterTitle =
          '“อุปสรรคจะมากขนาดไหน ขอให้เธอมั่นใจแล้วไปกับเรา”';
        this.characterImgLink = 'images/character-plucky.png';
        this.characterDescription =
          'แสงของเธอทำให้สังคม…มองเห็นอนาคตที่หายไป สร้างแรงบันดาลใจตัดสินใจเดินตามเป้าหมาย และเธอยังเป็นผู้นำที่ปกป้องทุกคนให้พ้นภัย';
        this.characterAttributes = [
          'ผู้ริเริ่ม กล้าหาญ บุกเบิก',
          'ความสามารถในการแก้ปัญหาเฉพาะหน้า',
          'มุ่งมั่น รักความก้าวหน้า',
          'ชอบแข่งขัน ตรงไปตรงมา',
          'เป้าหมายชัด เป็นผู้นำ มองภาพรวม',
        ];
        this.attributesChipColor = 'bg-[#eb4d3d]';
        this.shinningMethod =
          '“ส่องแสงของเธอด้วยการเป็นคนแรกที่พาทุกคนเปลี่ยนแปลงสังคม!ดูนั่นสิ! Food wasted เริ่มเยอะแล้ว ช่วยกินข้าวเพื่อนให้หมดกัน! Ψ(￣∇￣)Ψ”';
        break;
      case Character.PEACY:
        this.bgLink = 'images/yellow-bg-full.png';
        this.characterNameEn = 'Peacy';
        this.characterNameTh = 'ผู้กลมเกลียว';
        this.characterTitle =
          '“เราจะเป็นมิตรกับคนทั้งกาแลคซี่ และเป็นความแฮปปี้ให้เธอด้วย”';
        this.characterImgLink = 'images/character-peacy.png';
        this.characterDescription =
          'แสงของเธอทำให้สังคม…รวมเป็นหนึ่งเดียว เป็นผู้ไกล่เกลี่ยชั้นเยี่ยม เห็นใจ รู้ใจ เข้าใจ เสมือนว่าเป็นเขา ทำให้ทุกคนยอมรับ เป็นผู้ให้ที่สังคมขาดไม่ได้เลยทีเดียว';
        this.characterAttributes = [
          'เป็นมิตร ร่าเริง เป็นกันเอง',
          'ใจกว้าง โอบอ้อมอารี',
          'เป็นผู้ฟังที่ดี เข้าใจผู้อื่น',
          'มองโลกในแง่ดี เสียสละ',
          'นักสร้างความสัมพันธ์ เอาใจใส่คนรอบข้าง',
        ];
        this.attributesChipColor = 'bg-[#ffd76b]';
        this.shinningMethod =
          '“ส่องแสงของเธอด้วยการส่งต่อความสดใสให้คนรอบข้าง! เริ่มจากส่งข้อความให้กำลังใจไปยังเพื่อนสนิทให้เขาช็อคไปเลยเป็นไง? ٩(◕‿◕｡)۶ ”';
        break;
      case Character.DREAMY:
        this.bgLink = 'images/orange-bg-full.png';
        this.characterNameEn = 'Dreamy';
        this.characterNameTh = 'ผู้สุนทรีย์';
        this.characterTitle = '“ทุกสิ่งที่เธอฝัน เราจะช่วยทำมันให้เป็นจริง”';
        this.characterImgLink = 'images/character-dreamy.png';
        this.characterDescription =
          'แสงของเธอทำให้สังคม…เชื่อว่าทุกฝันเกิดขึ้นได้จริง ทุกปัญหาจะแก้ไขได้ เธอคลายทุกความกังวล และเปลี่ยนเป็นความสดใสพร้อมกับสิ่งใหม่ที่กำลังจะเกิดขึ้น';
        this.characterAttributes = [
          'โดดเด่น มีเสน่ห์',
          'รักอิสระ มองโลกในแง่ดี',
          'สร้างสรรค์ ช่างจินตนาการ',
          'มีมนุษยสัมพันธ์ เข้ากับคนง่าย',
          'แก้ไขปัญหาเฉพาะหน้าได้ดี กระตือรือร้น',
        ];
        this.attributesChipColor = 'bg-[#ef8923]';
        this.shinningMethod =
          '“ส่องแสงของเธอด้วยการปรับนิดเปลี่ยนหน่อยสิ่งของที่เธอมีให้กลายเป็นไอเดียใหม่ที่น่าสนใจ! เอาเสื้อผ้าในตู้มา match ใหม่ ให้กลายเป็น new look ดูสิ! (๑˃ᴗ˂)ﻭ ”';
        break;
      case Character.MEKKA:
        this.bgLink = 'images/green-bg-full.png';
        this.characterNameEn = 'Mekka';
        this.characterNameTh = 'ผู้จริงใจ';
        this.characterTitle =
          '“คนน่ารักที่เธอบอกว่าน่ากอด เค้าซัพพอร์ตเธอได้เท่าเรามั้ย”';
        this.characterImgLink = 'images/character-mekka.png';
        this.characterDescription =
          'แสงของเธอทำให้สังคม…ไม่ขาดแคลนคนทำจริง มีความหวัง รู้สึกปลอดภัยในทุกการกระทำเพราะเธอจะคอยรับฟัง เป็นที่พึ่ง และซัพพอร์ตทุกคนด้วยความเข้าใจเสมอ';
        this.characterAttributes = [
          'นักสนับสนุน และช่วยเหลือทุกคน',
          'สุภาพ อ่อนน้อมถ่อมตน',
          'มีความประนีประนอม',
          'อดทน รับฟังคนอื่นได้ดี',
          'รักสงบ ชื่นชอบความเรียบง่าย',
        ];
        this.attributesChipColor = 'bg-[#50eac6]';
        this.shinningMethod =
          '“ส่องแสงของเธอด้วยการส่งต่อความช่วยเหลือของเธอไปยังทุกคนที่เธอสามารถช่วยได้! เริ่มจากแบ่งขนมอร่อยๆ ให้คุณน้าข้างบ้านที่ชอบมาเม้ากับแม่เราดูสิ!  ᕕ( ᐛ )ᕗ ”';
        break;
      default:
        break;
    }
  }
}
