import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Choice {
  title: string;
  score: number;
  type: string;
}

export interface Question {
  id: string;
  title: string;
  choices: Choice[];
}

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private questions: Question[] = [
    {
      id: '1',
      title: 'มีโลกส่วนตัวและชอบการอยู่คนเดียว',
      choices: [
        { title: 'Strongly Agree', score: 1, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Agree', score: 2, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Neutral', score: 3, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Disagree', score: 4, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Strongly Disagree', score: 5, type: 'Wisdom(ผู้ทรงปัญญา)' },
      ],
    },
    {
      id: '2',
      title: 'มักจะระแวงเวลามีดาวดวงอื่นเข้ามาสนิทด้วย',
      choices: [
        { title: 'Strongly Agree', score: 1, type: 'Courage(ผู้กล้าหาญ)' },
        { title: 'Agree', score: 2, type: 'Courage(ผู้กล้าหาญ)' },
        { title: 'Neutral', score: 3, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Disagree', score: 4, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Strongly Disagree', score: 5, type: 'Wisdom(ผู้ทรงปัญญา)' },
      ],
    },
    {
      id: '3',
      title: 'ชอบงานที่ได้อยู่เงียบๆ และได้ค้นคว้า',
      choices: [
        { title: 'Strongly Agree', score: 1, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Agree', score: 2, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Neutral', score: 3, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Disagree', score: 4, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Strongly Disagree', score: 5, type: 'Wisdom(ผู้ทรงปัญญา)' },
      ],
    },
    {
      id: '4',
      title: 'สนใจอาชีพที่ได้ทำงานอยู่ที่บ้าน ไม่ต้องพบเจอผู้คนแปลกหน้า',
      choices: [
        { title: 'Strongly Agree', score: 1, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Agree', score: 2, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Neutral', score: 3, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Disagree', score: 4, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Strongly Disagree', score: 5, type: 'Wisdom(ผู้ทรงปัญญา)' },
      ],
    },
    {
      id: '5',
      title: 'มักจะเกร็ง ถ้าต้องสานสัมพันธ์กับดาวดวงใหม่',
      choices: [
        { title: 'Strongly Agree', score: 1, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Agree', score: 2, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Neutral', score: 3, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Disagree', score: 4, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Strongly Disagree', score: 5, type: 'Wisdom(ผู้ทรงปัญญา)' },
      ],
    },
    {
      id: '6',
      title: 'จริงจัง น่าเชื่อถือ เรียบร้อย วางตัวดี รู้กาลเทศะ สุขุม',
      choices: [
        { title: 'Strongly Agree', score: 1, type: 'Methodical(ผู้มีแบบแผน)' },
        { title: 'Agree', score: 2, type: 'Methodical(ผู้มีแบบแผน)' },
        { title: 'Neutral', score: 3, type: 'Methodical(ผู้มีแบบแผน)' },
        { title: 'Disagree', score: 4, type: 'Methodical(ผู้มีแบบแผน)' },
        { title: 'Strongly Disagree', score: 5, type: 'Methodical(ผู้มีแบบแผน)' },
      ],
    },
    {
      id: '7',
      title: 'มีความระมัดระวัง รอบคอบ ใช้ชีวิตอย่างมีขั้นมีตอน',
      choices: [
        { title: 'Strongly Agree', score: 1, type: 'Methodical(ผู้มีแบบแผน)' },
        { title: 'Agree', score: 2, type: 'Methodical(ผู้มีแบบแผน)' },
        { title: 'Neutral', score: 3, type: 'Methodical(ผู้มีแบบแผน)' },
        { title: 'Disagree', score: 4, type: 'Methodical(ผู้มีแบบแผน)' },
        { title: 'Strongly Disagree', score: 5, type: 'Methodical(ผู้มีแบบแผน)' },
      ],
    },
    {
      id: '8',
      title: 'ชอบวางแผน จัดการข้อมูล และมีระเบียบ',
      choices: [
        { title: 'Strongly Agree', score: 1, type: 'Methodical(ผู้มีแบบแผน)' },
        { title: 'Agree', score: 2, type: 'Methodical(ผู้มีแบบแผน)' },
        { title: 'Neutral', score: 3, type: 'Methodical(ผู้มีแบบแผน)' },
        { title: 'Disagree', score: 4, type: 'Methodical(ผู้มีแบบแผน)' },
        { title: 'Strongly Disagree', score: 5, type: 'Methodical(ผู้มีแบบแผน)' },
      ],
    },
    {
      id: '9',
      title: 'มักจะอึดอัดมาก ถ้าคนอื่นทำอะไรไม่มีระบบ',
      choices: [
        { title: 'Strongly Agree', score: 1, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Agree', score: 2, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Neutral', score: 3, type: 'Methodical(ผู้มีแบบแผน)' },
        { title: 'Disagree', score: 4, type: 'Methodical(ผู้มีแบบแผน)' },
        { title: 'Strongly Disagree', score: 5, type: 'Methodical(ผู้มีแบบแผน)' },
      ],
    },
    {
      id: '10',
      title: 'วางแผนอย่างรอบคอบก่อนออกเดินทาง',
      choices: [
        { title: 'Strongly Agree', score: 1, type: 'Methodical(ผู้มีแบบแผน)' },
        { title: 'Agree', score: 2, type: 'Methodical(ผู้มีแบบแผน)' },
        { title: 'Neutral', score: 3, type: 'Methodical(ผู้มีแบบแผน)' },
        { title: 'Disagree', score: 4, type: 'Methodical(ผู้มีแบบแผน)' },
        { title: 'Strongly Disagree', score: 5, type: 'Methodical(ผู้มีแบบแผน)' },
      ],
    },
    {
      id: '11',
      title: 'ใช้ชีวิตตามยึดตามหลักศีลธรรม กรอบธรรมเนียมที่ถูกสอนมา',
      choices: [
        { title: 'Strongly Agree', score: 1, type: 'Courage(ผู้กล้าหาญ)' },
        { title: 'Agree', score: 2, type: 'Courage(ผู้กล้าหาญ)' },
        { title: 'Neutral', score: 3, type: 'Sincerity(ผู้จริงใจ)' },
        { title: 'Disagree', score: 4, type: 'Sincerity(ผู้จริงใจ)' },
        { title: 'Strongly Disagree', score: 5, type: 'Sincerity(ผู้จริงใจ)' },
      ],
    },
    {
      id: '12',
      title: 'ชอบทำงานประจำมั่นคง ไม่ค่อยเปลี่ยนงาน',
      choices: [
        { title: 'Strongly Agree', score: 1, type: 'Aesthetic(ผู้สุนทรีย์)' },
        { title: 'Agree', score: 2, type: 'Aesthetic(ผู้สุนทรีย์)' },
        { title: 'Neutral', score: 3, type: 'Sincerity(ผู้จริงใจ)' },
        { title: 'Disagree', score: 4, type: 'Sincerity(ผู้จริงใจ)' },
        { title: 'Strongly Disagree', score: 5, type: 'Sincerity(ผู้จริงใจ)' },
      ],
    },
    {
      id: '13',
      title: 'มีความอดทนสูง ไม่ค่อยมั่นใจในตนเอง ไม่กล้าแสดงออก',
      choices: [
        { title: 'Strongly Agree', score: 1, type: 'Harmony(ผู้กลมเกลียว)' },
        { title: 'Agree', score: 2, type: 'Harmony(ผู้กลมเกลียว)' },
        { title: 'Neutral', score: 3, type: 'Sincerity(ผู้จริงใจ)' },
        { title: 'Disagree', score: 4, type: 'Sincerity(ผู้จริงใจ)' },
        { title: 'Strongly Disagree', score: 5, type: 'Sincerity(ผู้จริงใจ)' },
      ],
    },
    {
      id: '14',
      title: 'เป็นผู้ตามที่ดี และชอบสังคมที่ดาวทุกดวงช่วยเหลือกัน',
      choices: [
        { title: 'Strongly Agree', score: 1, type: 'Sincerity(ผู้จริงใจ)' },
        { title: 'Agree', score: 2, type: 'Sincerity(ผู้จริงใจ)' },
        { title: 'Neutral', score: 3, type: 'Sincerity(ผู้จริงใจ)' },
        { title: 'Disagree', score: 4, type: 'Sincerity(ผู้จริงใจ)' },
        { title: 'Strongly Disagree', score: 5, type: 'Sincerity(ผู้จริงใจ)' },
      ],
    },
    {
      id: '15',
      title: 'ชอบทำงานที่ได้ลงมือทำมากกว่าใช้คำพูดและความคิด',
      choices: [
        { title: 'Strongly Agree', score: 1, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Agree', score: 2, type: 'Wisdom(ผู้ทรงปัญญา)' },
        { title: 'Neutral', score: 3, type: 'Sincerity(ผู้จริงใจ)' },
        { title: 'Disagree', score: 4, type: 'Sincerity(ผู้จริงใจ)' },
        { title: 'Strongly Disagree', score: 5, type: 'Sincerity(ผู้จริงใจ)' },
      ],
    },
  ];

  getQuestion(id: string): Observable<Question> {
    const question = this.questions.find((q) => q.id === id) || {
      id: '0',
      title: 'Question not found',
      choices: [],
    };
    return of(question);
  }

  getTotalQuestions(): number {
    return this.questions.length;
  }
}
