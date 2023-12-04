import { genderQuestionId } from '@/data/questionnaire';
import { Open_Sans } from 'next/font/google';
import Link from 'next/link';

const openSans = Open_Sans({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={openSans.className}>
      <Link href={`/question/${genderQuestionId}`}>To the first question</Link>
    </main>
  );
}
