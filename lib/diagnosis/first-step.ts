import { GRADE_META } from "@/lib/diagnosis/grade";
import { AXIS_DISPLAY, AXIS_ORDER } from "@/lib/diagnosis/personality-types";
import type {
  CategoryId,
  CategoryScore,
  FirstStepAdvice,
  GradeLevel,
  ResultTypeId,
} from "@/types/diagnosis";

type StepCopy = {
  why: string;
  action: string;
};

/**
 * 伸びしろ軸 × Lv1〜4 の実践アドバイス。
 * 至高（Rank S）以外に適用する。
 */
const LEVEL_AXIS_STEPS: Record<CategoryId, Record<GradeLevel, StepCopy>> = {
  physique: {
    1: {
      why: "フィジカルは【初心者レベル】。身体の変化はいちばん見えやすく、自信の入口になります。",
      action:
        "今日、高タンパクな食事を1食だけ意識して選ぼう。水分をコップ2杯足すだけでも十分。原石は、小さな研磨から輝き始める。",
    },
    2: {
      why: "フィジカルは【成長途上レベル】。動き始めている今こそ、継続の型が差を生みます。",
      action:
        "今週、週2回・各20分の運動枠をカレンダーに先に入れよう。強度より「予定どおり行う」ことを優先する。",
    },
    3: {
      why: "フィジカルは【洗練レベル】。基礎はある。質と回復を上げると、他軸にも余裕が広がります。",
      action:
        "次のトレは「追い込み」ではなく「フォームと呼吸」に集中し、就寝前ストレッチ10分を固定しよう。",
    },
    4: {
      why: "フィジカルは【卓越レベル】でも相対的な伸びしろ。頂点を保つ「壊れない設計」が次の課題です。",
      action:
        "今週のメニューに回復日を明示し、睡眠時間を30分伸ばす実験を3日続けよう。強さは、余白で長持ちする。",
    },
  },
  appearance: {
    1: {
      why: "スタイルは【初心者レベル】。清潔感は、最も速い印象改善のレバーです。",
      action:
        "今夜、髪型・ヒゲ・爪を3分だけ整え、明日の服を前の晩に選ぼう。整う感覚が、自己効力感の種になる。",
    },
    2: {
      why: "スタイルは【成長途上レベル】。基本はできつつある。再現できる「型」に落とす番です。",
      action:
        "似合う色を1つ決め、今週のトップスはその色か無彩色に限定しよう。制限から輪郭が生まれる。",
    },
    3: {
      why: "スタイルは【洗練レベル】。完成度を一段上げるには、細部の一貫性が効きます。",
      action:
        "靴・襟元・香りまで揃えた「決定打ワンセット」を今週決めよう。迷いがない装いが、場の空気を変える。",
    },
    4: {
      why: "スタイルは【卓越レベル】でも相対的な伸びしろ。最後の1%が、品格の差になります。",
      action:
        "上座や初対面用のフォーマル一式を点検し、手入れ（靴磨き・クリーニング）日を月1で固定しよう。",
    },
  },
  lifestyle: {
    1: {
      why: "規律は【初心者レベル】。リズムの一点突破が、すべての努力の土台になります。",
      action:
        "明日の起床時刻だけ決め、今夜のうちにアラームをセットしよう。原石を削る作業台は、規則正しい朝にある。",
    },
    2: {
      why: "規律は【成長途上レベル】。続いている習慣を「崩さない枠」に変えると加速します。",
      action:
        "起床・就寝を同じ時刻に3日固定し、スマホを寝室の外に置くルールを1つだけ加えよう。",
    },
    3: {
      why: "規律は【洗練レベル】。優れた構想を成果に変えるのは、日常の締切と枠です。",
      action:
        "今週の「必須3タスク」だけを書き、それ以外は入れない週にしよう。計画の切れ味は、削る力で決まる。",
    },
    4: {
      why: "規律は【卓越レベル】でも相対的な伸びしろ。高い水準を再現する静かな設計が次です。",
      action:
        "「決断のゴールデンタイム」を1時間だけ守り、その枠以外では重要判断をしないルールを試そう。",
    },
  },
  mind: {
    1: {
      why: "マインドは【初心者レベル】。動き出す前に、自分の中心を一滴だけ濃くしましょう。",
      action:
        "ノートに「理想の自分」を3行だけ書こう。方向が見えると、他の軸の努力が無駄にならない。",
    },
    2: {
      why: "マインドは【成長途上レベル】。内面の言語化が、選択の質を一段引き上げます。",
      action:
        "今日の気づきを、誰か1人に短く話してみよう。内なる軸は、共有されて初めて影響力になる。",
    },
    3: {
      why: "マインドは【洗練レベル】。強さの次は、影響力の翻訳——言葉と気配りの精度です。",
      action:
        "今夜、感謝を伝えるべき相手を1人決め、具体的な一文だけ送ろう。敬意が、信頼の厚みになる。",
    },
    4: {
      why: "マインドは【卓越レベル】でも相対的な伸びしろ。思想を人に届ける出口設計が次です。",
      action:
        "自分が戦ってきた理由を3行ノートに書き、来週誰かに話せる形へ整えよう。言語化した強さは、孤高からカリスマへ変わる。",
    },
  },
};

/** 優先補強軸：最も低い grade → 低い score → 軸順 */
export function pickFocusCategory(categoryScores: CategoryScore[]): CategoryScore {
  return [...categoryScores].sort((a, b) => {
    if (a.grade !== b.grade) return a.grade - b.grade;
    if (a.score !== b.score) return a.score - b.score;
    if (a.average !== b.average) return a.average - b.average;
    return AXIS_ORDER.indexOf(a.categoryId) - AXIS_ORDER.indexOf(b.categoryId);
  })[0]!;
}

function buildWhyWithContext(
  baseWhy: string,
  focus: CategoryScore,
  strength: CategoryScore | null,
): string {
  const gradeLabel = GRADE_META[focus.grade].label;
  if (
    strength &&
    strength.categoryId !== focus.categoryId &&
    strength.score > focus.score
  ) {
    return `${baseWhy}（現在 ${focus.score}% / ${gradeLabel}。強みの【${strength.axisName}】${strength.score}% を活かしつつ底上げしよう）`;
  }
  return `${baseWhy}（現在 ${focus.score}% / ${gradeLabel}）`;
}

/**
 * 至高以外向け：「伸びしろ軸」のレベルに応じた最初の一歩。
 * Rank S では呼ばないこと。
 */
export function buildLevelAwareFirstStep(params: {
  typeName: string;
  typeId: ResultTypeId;
  categoryScores: CategoryScore[];
  isPrototype?: boolean;
}): FirstStepAdvice {
  const focus = pickFocusCategory(params.categoryScores);
  const ordered = [...params.categoryScores].sort((a, b) => b.score - a.score);
  const strength = ordered[0] ?? null;
  const copy = LEVEL_AXIS_STEPS[focus.categoryId][focus.grade];
  const axisName = AXIS_DISPLAY[focus.categoryId].name;

  return {
    axisName,
    categoryId: focus.categoryId,
    typeName: params.typeName,
    typeId: params.typeId,
    why: buildWhyWithContext(copy.why, focus, strength),
    action: copy.action,
    grade: focus.grade,
    gradeLabel: GRADE_META[focus.grade].label,
    isPrototype: params.isPrototype,
  };
}
