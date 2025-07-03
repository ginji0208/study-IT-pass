document.addEventListener('DOMContentLoaded', () => {
    const flashcard = document.getElementById('flashcard');
    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answer');
    const nextCardBtn = document.getElementById('nextCardBtn');
    const correctBtn = document.getElementById('correct-btn'); // 新しく追加
    const incorrectBtn = document.getElementById('incorrect-btn'); // 新しく追加

    // 統計情報表示用の要素
    const answeredCountElement = document.getElementById('answered-count');
    const correctCountElement = document.getElementById('correct-count');
    const accuracyRateElement = document.getElementById('accuracy-rate');

    // 問題と答えのデータ（あなたの提供データ）
    const cards = [
        { question: "CPUの役割は？", answer: "計算と制御を行うコンピュータの頭脳。" },
        { question: "RAMの特徴は？", answer: "一時的にデータを保持し、電源オフで内容が消える。" },
        { question: "OSの機能は？", answer: "ハードウェアとソフトウェアを管理する基本ソフト。" },
        { question: "IPアドレスの用途は？", answer: "ネットワーク上の機器を識別する番号。" },
        { question: "マルウェアの例は？", answer: "ウイルス、ワーム、トロイの木馬などの悪意あるソフトウェア。" },
        { question: "フィッシングとは？", answer: "偽サイトへ誘導し、IDやパスワードをだまし取る詐欺。" },
        { question: "DDoS攻撃の目的は？", answer: "大量のアクセスでサービスを停止させること。" },
        { question: "二段階認証の利点は？", answer: "パスワードに加え、別の手段で本人確認しセキュリティを強化。" },
        { question: "IoTがもたらす変化は？", answer: "モノがインターネットにつながり、データ収集や遠隔操作が可能に。" },
        { question: "AIの応用例は？", answer: "画像認識、音声認識、自動運転など。" },
        { question: "ビッグデータの特徴は？", answer: "量、種類、発生頻度が高いデータ群。" },
        { question: "クラウドコンピューティングの利点は？", answer: "インターネット経由で必要な時にサービスを利用できる。" },
        { question: "RDBMSとは？", answer: "リレーショナルデータベースを管理するシステム。" },
        { question: "SQLの役割は？", answer: "データベースの操作やデータ定義を行う言語。" },
        { question: "ブロックチェーンの特徴は？", answer: "分散型台帳技術で、データの改ざんが困難。" },
        { question: "5Gのメリットは？", answer: "超高速、超低遅延、多数同時接続。" },
        { question: "LANとWANの違いは？", answer: "LANは建物内など限定された範囲、WANは遠隔地を結ぶネットワーク。" },
        { question: "TCP/IPとは？", answer: "インターネットで使われる通信プロトコルの集合。" },
        { question: "MACアドレスの役割は？", "answer": "ネットワーク機器に割り当てられた物理的な識別番号。" },
        { question: "DNSの機能は？", answer: "ドメイン名をIPアドレスに変換するシステム。" },
        { question: "HTTPとHTTPSの違いは？", answer: "HTTPSはHTTPに暗号化機能（SSL/TLS）を追加し、安全性を高めたもの。" },
        { question: "Wi-Fiの利点は？", answer: "無線でインターネットに接続できる技術。" },
        { question: "Bluetooth (BLE)の特徴は？", answer: "近距離無線通信技術で、BLEは低消費電力が特徴。" },
        { question: "仮想化のメリットは？", answer: "物理的なリソースを論理的に分割し、効率的に利用できる。" },
        { question: "ゼロデイ攻撃とは？", answer: "ソフトウェアの脆弱性が修正される前に攻撃すること。" },
        { question: "SQLインジェクションの対策は？", answer: "入力値のチェックやエスケープ処理を徹底する。" },
        { question: "中間者攻撃とは？", answer: "通信の間に割り込み、情報を盗聴・改ざんする攻撃。" },
        { question: "ブルートフォース攻撃とは？", answer: "パスワードなどを総当たりで試す攻撃。" },
        { question: "パスワードリスト攻撃とは？", answer: "他所で漏洩したIDとパスワードの組み合わせを使い回す攻撃。" },
        { question: "ソーシャルエンジニアリングの例は？", answer: "人の心理的な隙を突いて情報を盗む手口（例：なりすまし）。" },
        { question: "ISMSの目的は？", answer: "情報セキュリティマネジメントシステムで、情報資産を適切に管理する。" },
        { question: "情報セキュリティの機密性とは？", answer: "許可された者だけが情報にアクセスできること。" },
        { question: "情報セキュリティの完全性とは？", answer: "情報が正確で、改ざんされていないこと。" },
        { question: "情報セキュリティの可用性とは？", answer: "許可された者が、必要な時に情報にアクセスできること。" },
        { question: "生体認証の例は？", answer: "指紋、顔、虹彩など、身体的特徴で本人確認を行う。" },
        { question: "共通鍵暗号方式の特徴は？", answer: "送信者と受信者が同じ鍵を使う暗号方式。" },
        { question: "公開鍵暗号方式の特徴は？", answer: "公開鍵と秘密鍵のペアを使い、安全な通信を行う。" },
        { question: "電子署名の目的は？", answer: "電子文書の作成者が本人であることと、改ざんがないことを証明。" },
        { question: "ファイアウォールの役割は？", answer: "ネットワークの境界で不正な通信を遮断する。" },
        { question: "IDS/IPSの機能は？", answer: "不正侵入を検知（IDS）し、防御（IPS）するシステム。" },
        { question: "EDRの役割は？", answer: "エンドポイント（PCなど）の不審な挙動を検知・対応する。" },
        { question: "リスクベース認証とは？", answer: "ログイン時の状況に応じて認証強度を変える方法。" },
        { question: "パスワードレス認証の例は？", answer: "パスワードを使わず、生体認証やFIDOなどで認証する。" },
        { question: "生成AIの応用例は？", answer: "テキスト、画像、音楽などを自動生成するAI技術。" },
        { question: "説明可能なAI (XAI)の目的は？", answer: "AIの判断根拠を人が理解できるようにすること。" },
        { question: "WBSの目的は？", answer: "プロジェクトの作業を階層的に分解し、管理しやすくする。" },
        { question: "ガントチャートは何を表す？", answer: "プロジェクトの作業スケジュールを視覚化した図。" },
        { question: "PMBOKとは？", answer: "プロジェクトマネジメントの知識体系ガイド。" },
        { question: "アジャイル開発の特徴は？", answer: "短い期間で開発とテストを繰り返し、変化に対応。" },
        { question: "ウォーターフォール開発の特徴は？", answer: "工程を順に進め、後戻りしない開発手法。" },
        { question: "ITILの目的は？", answer: "ITサービスマネジメントの成功事例を集めたガイドライン。" },
        { question: "SLAとは？", answer: "サービス提供者と顧客間のサービス品質に関する合意。" },
        { question: "システム監査の役割は？", answer: "情報システムの安全性や信頼性を客観的に評価する。" },
        { question: "ヘルプデスクの機能は？", answer: "顧客からの問い合わせに対応し、問題解決を支援。" },
        { question: "リソース管理の対象は？", answer: "人員、時間、資材など、プロジェクトに必要な資源の管理。" },
        { question: "リスク管理のプロセスは？", answer: "リスクを特定し、分析し、対策を講じること。" },
        { question: "ステークホルダーとは？", answer: "プロジェクトに関わる利害関係者（顧客、チームメンバーなど）。" },
        { question: "品質管理の目的は？", answer: "製品やサービスの品質を維持・向上させること。" },
        { question: "ユーザーエクスペリエンス (UX)とは？", answer: "製品やサービスを通じて得られる利用者の体験全体。" },
        { question: "サービスマネジメントの目的は？", answer: "ITサービスを効率的かつ効果的に提供・運用すること。" },
        { question: "ソフトウェアライフサイクルの段階は？", answer: "企画、要件定義、開発、テスト、運用、保守など。" },
        { question: "要件定義の重要性は？", answer: "システム開発で、何を作るかを明確にする最初の工程。" },
        { question: "テストの目的は？", answer: "システムが要件通りに動作するか、不具合がないかを確認する。" },
        { question: "内部統制の目的は？", answer: "業務の有効性・効率性、財務報告の信頼性などを確保する。" },
        { question: "PDCAサイクルの各段階は？", answer: "Plan（計画）、Do（実行）、Check（評価）、Action（改善）。" },
        { question: "KPIの役割は？", answer: "目標達成度を測るための重要業績評価指標。" },
        { question: "ベンチマーキングとは？", answer: "他社の優れた事例と比較し、自社の改善点を見つける手法。" },
        { question: "アウトソーシングの利点は？", answer: "外部に業務を委託し、コスト削減や専門性の活用を図る。" },
        { question: "SWOT分析の要素は？", answer: "強み、弱み、機会、脅威。" },
        { question: "PPM（プロダクトポートフォリオマネジメント）の目的は？", answer: "事業を資金の創出と消費の観点から評価し、戦略を立てる。" },
        { question: "バランススコアカードの4つの視点は？", answer: "財務、顧客、業務プロセス、学習と成長。" },
        { question: "DX（デジタルトランスフォーメーション）とは？", answer: "デジタル技術でビジネスモデルや組織を変革すること。" },
        { question: "著作権法の目的は？", answer: "著作物の利用と保護のバランスを図り、文化の発展に寄与。" },
        { question: "不正アクセス禁止法の対象は？", answer: "他人のID・パスワードを使った不正ログインなど。" },
        { question: "個人情報保護法のポイントは？", answer: "個人情報の適正な取得、利用、管理を義務付ける。" },
        { question: "情報流通プラットフォーム対処法は何に対応？", answer: "オンラインプラットフォーム上の誹謗中傷など不法情報に対処。" },
        { question: "インボイス制度の目的は？", answer: "複数税率に対応した消費税の仕入れ税額控除の適正化。" },
        { question: "NFTの特徴は？", answer: "ブロックチェーン上の非代替性トークンで、デジタル資産の唯一性を証明。" },
        { question: "バリューチェーンとは？", answer: "企業活動を価値創造の連鎖として捉える分析手法。" },
        { question: "BPRの目的は？", answer: "業務プロセスを根本的に見直し、劇的な改善を目指す。" },
        { question: "ERPとは？", answer: "企業の基幹業務（会計、生産など）を統合管理するシステム。" },
        { question: "CRMの目的は？", answer: "顧客との関係を構築・維持し、顧客満足度と収益を向上させる。" },
        { question: "SCMの目的は？", answer: "サプライチェーン全体を最適化し、効率的な物流を実現する。" },
        { question: "損益計算書は何を示す？", answer: "一定期間の企業の収益と費用、最終的な利益。" },
        { question: "貸借対照表は何を示す？", answer: "ある時点での企業の資産、負債、純資産の状態。" },
        { question: "キャッシュフロー計算書は何を示す？", answer: "一定期間の現金の増減（営業、投資、財務活動）。" },
        { question: "投資回収期間とは？", answer: "投資額を回収するのにかかる期間。" },
        { question: "固定費の例は？", answer: "売上に関わらず発生する費用（例：家賃、減価償却費）。" },
        { question: "変動費の例は？", answer: "売上に応じて変動する費用（例：原材料費、販売手数料）。" },
        { question: "ROEとは？", answer: "自己資本に対する当期純利益の割合で、株主資本の効率性を示す。" },
        { question: "ROIとは？", answer: "投資額に対する利益の割合で、投資効率を示す。" },
        { question: "サステナビリティとは？", answer: "持続可能性。環境・社会・経済のバランスを考慮した経営。" },
        { question: "パーパス経営とは？", answer: "企業の存在意義や社会的使命を経営の中心に据える手法。" },
        { question: "ブレーンストーミングのルールは？", answer: "自由な発想、批判禁止、量重視、結合・改善。" },
        { question: "デザイン思考のプロセスは？", answer: "共感、問題定義、アイデア創出、プロトタイプ、テスト。" },
        { question: "アジャイルの原則は？", answer: "変化への対応、顧客との協調、動くソフトウェアを重視。" },
        { question: "情報流通プラットフォーム対処法の主な義務は？", answer: "侵害情報の削除手続きの迅速化、運用状況の透明化、プラットフォーム事業者の義務。" },
        { question: "環境関連法の例は？", answer: "廃棄物処理法、地球温暖化対策推進法など。" },
        { question: "インボイス制度の正式名称は？", answer: "適格請求書等保存方式。" },
        { question: "NFTの技術的特徴は？", answer: "ブロックチェーン上で唯一性を証明する非代替性トークン。" }
    ];

    // --- 状態管理変数 ---
    let shuffledCards = []; // シャッフルされたカードの配列
    let currentCardIndex = 0; // 現在表示しているカードのインデックス
    let answeredQuestionsCount = 0; // 回答した問題数
    let correctAnswersCount = 0; // 正解した問題数

    // --- 関数定義 ---

    // 配列をシャッフルする関数 (Fisher-Yatesシャッフルアルゴリズム)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // 統計情報を更新して表示する関数
    function updateStats() {
        answeredCountElement.textContent = answeredQuestionsCount;
        correctCountElement.textContent = correctAnswersCount;
        const accuracy = answeredQuestionsCount === 0 ? 0 : (correctAnswersCount / answeredQuestionsCount) * 100;
        accuracyRateElement.textContent = `${accuracy.toFixed(1)}%`;
    }

    // カードの内容を更新して表示する関数
    function updateCard() {
        // カードが裏返っている場合は、表面に戻すアニメーション
        if (flashcard.classList.contains('flipped')) {
            flashcard.classList.remove('flipped');
            // アニメーションが完了するのを待ってから内容を更新
            setTimeout(() => {
                displayCurrentCardContent();
            }, 300); // CSSのtransition時間と合わせる (0.6sの半分程度)
        } else {
            displayCurrentCardContent();
        }

        // 正解/不正解ボタンを有効にする
        correctBtn.disabled = false;
        incorrectBtn.disabled = false;
    }

    // 現在のカードの内容を表示するヘルパー関数
    function displayCurrentCardContent() {
        if (currentCardIndex >= shuffledCards.length) {
            // 全ての問題を回答し終えた場合
            questionElement.textContent = 'すべての問題を回答しました！';
            answerElement.textContent = '学習お疲れ様でした！もう一度挑戦する場合は「次の問題」をクリックしてください。';
            // 解答を強制的に表示状態にする（裏返したままにしない）
            flashcard.classList.add('flipped'); // 解答が見えるようにする
            correctBtn.disabled = true;
            incorrectBtn.disabled = true;
            nextCardBtn.textContent = '最初からやり直す';
        } else {
            const currentCard = shuffledCards[currentCardIndex];
            questionElement.textContent = currentCard.question;
            answerElement.textContent = currentCard.answer;
            nextCardBtn.textContent = '次の問題'; // テキストを元に戻す
        }
    }

    // アプリケーションを初期化する関数
    function initializeQuiz() {
        shuffledCards = [...cards]; // 元の配列をコピー
        shuffleArray(shuffledCards); // シャッフル
        currentCardIndex = 0;
        answeredQuestionsCount = 0;
        correctAnswersCount = 0;
        updateStats(); // 統計情報をリセット
        updateCard(); // 最初のカードを表示
    }

    // --- イベントリスナー ---

    // カードをめくる (クリックで裏表)
    flashcard.addEventListener('click', () => {
        // 全ての問題を回答し終えた場合はフリップさせない
        if (currentCardIndex < shuffledCards.length) {
            flashcard.classList.toggle('flipped');
        }
    });

    // 「正解！」ボタン
    correctBtn.addEventListener('click', () => {
        if (currentCardIndex < shuffledCards.length) { // 全ての問題を回答し終えていない場合のみ処理
            answeredQuestionsCount++;
            correctAnswersCount++;
            updateStats();
            correctBtn.disabled = true;
            incorrectBtn.disabled = true;
            flashcard.classList.add('flipped'); // 解答を自動的に表示
        }
    });

    // 「不正解...」ボタン
    incorrectBtn.addEventListener('click', () => {
        if (currentCardIndex < shuffledCards.length) { // 全ての問題を回答し終えていない場合のみ処理
            answeredQuestionsCount++;
            updateStats();
            correctBtn.disabled = true;
            incorrectBtn.disabled = true;
            flashcard.classList.add('flipped'); // 解答を自動的に表示
        }
    });

    // 「次の問題」ボタン
    nextCardBtn.addEventListener('click', () => {
        if (currentCardIndex >= shuffledCards.length) {
            // 全ての問題を回答し終えて「最初からやり直す」をクリックした場合
            initializeQuiz();
        } else {
            currentCardIndex++;
            updateCard();
        }
    });

    // --- アプリケーションの初期化 ---
    initializeQuiz();
});
