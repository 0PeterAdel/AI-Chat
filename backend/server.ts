import express, { Request, Response } from 'express';
import { fetch } from 'undici';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/**
 * بناء التعليمات (Prompt) المحسّنة للمساعد "منظّم"
 * @param {string} currentQuestion - السؤال الحالي من المستخدم.
 * @returns {string} - التعليمات الكاملة التي سيتم إرسالها للنموذج.
 */
const constructOrganizerPrompt = (currentQuestion: string): string => {
    // البيانات الكاملة للفعاليات. في تطبيق حقيقي، يتم جلبها من قاعدة بيانات.
    const eventsData = {
        "success": true, "message": "تم جلب الأحداث بنجاح", "data": {
            "events": [{ "_id": "6883a50a5fba5db9b1ea0c1d", "title": "ندوة الذكاء الاصطناعي في التعليم", "schedule": [{ "date": "2025-07-15T00:00:00.000Z", "times": [{ "startTime": "09:00", "endTime": "11:00" }] }], "categories": [{ "_id": "6882e933a4856cef96af7921", "title": "المعارض العلمية" }], "targetGroups": ["teacher", "student"], "gender": "all", "favorite": false }, { "_id": "6883a54638ce5ef069f87279", "title": "ندوة الذكاء الاصطناعي في التعليم", "schedule": [{ "date": "2025-07-15T00:00:00.000Z", "times": [{ "startTime": "09:00", "endTime": "11:00" }] }], "categories": [{ "_id": "6882e933a4856cef96af7921", "title": "المعارض العلمية" }], "targetGroups": ["teacher", "student"], "gender": "all", "favorite": false }, { "_id": "68837a4832cee87c5f84f4a1", "title": "يوم السلامة المرورية", "schedule": [{ "date": "2025-07-20T00:00:00.000Z", "times": [{ "startTime": "08:30", "endTime": "11:00" }, { "startTime": "14:15", "endTime": "16:45" }] }], "categories": [{ "_id": "6882e931a4856cef96af790d", "title": "السلامة المرورية" }], "targetGroups": ["all"], "gender": "boy", "favorite": false }, { "_id": "68844cce1c858df1610e62da", "title": "ندوة الذكاء الاصطناعي في التعليم", "schedule": [{ "date": "2025-07-26T00:00:00.000Z", "times": [{ "startTime": "09:00", "endTime": "11:00" }] }], "categories": [{ "_id": "6882e933a4856cef96af7921", "title": "المعارض العلمية" }], "targetGroups": ["teacher", "student"], "gender": "all", "favorite": false }, { "_id": "6884dc204547237fbf13904c", "title": "ندوة الذكاء الاصطناعي في التعليم", "schedule": [{ "date": "2025-07-26T00:00:00.000Z", "times": [{ "startTime": "17:00", "endTime": "18:00" }] }], "categories": [{ "_id": "6882e933a4856cef96af7921", "title": "المعارض العلمية" }], "targetGroups": ["teacher", "student"], "gender": "all", "favorite": false }, { "_id": "68863a850224c3dedc846b7a", "title": "ندوة الذكاء الاصطناعي في التعليم", "schedule": [{ "date": "2025-07-26T00:00:00.000Z", "times": [{ "startTime": "17:00", "endTime": "18:00" }] }], "categories": [{ "_id": "6882e933a4856cef96af7921", "title": "المعارض العلمية" }], "targetGroups": ["teacher", "student"], "gender": "all", "favorite": false }, { "_id": "6885602b7216e7a50e2d4f78", "title": "ندوة الذكاء الاصطناعي في التعليم", "schedule": [{ "date": "2025-07-27T00:00:00.000Z", "times": [{ "startTime": "03:00", "endTime": "04:00" }] }], "categories": [{ "_id": "6882e933a4856cef96af7921", "title": "المعارض العلمية" }], "targetGroups": ["teacher", "student"], "gender": "all", "favorite": false }, { "_id": "68837a4a32cee87c5f84f4bf", "title": "ورشة الأنشطة المسرحية", "schedule": [{ "date": "2025-07-28T00:00:00.000Z", "times": [{ "startTime": "17:00", "endTime": "19:00" }] }], "categories": [{ "_id": "6882e92fa4856cef96af78f1", "title": "الأنشطة المسرحية" }], "targetGroups": ["activity_leader", "student_advisor", "health_advisor", "teacher", "school_principal", "parent", "student"], "gender": "girl", "favorite": false }, { "_id": "68837a4632cee87c5f84f492", "title": "ورشة البرمجة باستخدام Python", "schedule": [{ "date": "2025-08-10T00:00:00.000Z", "times": [{ "startTime": "09:00", "endTime": "12:00" }] }], "categories": [{ "_id": "6882e929a4856cef96af78b9", "title": "البرمجة والتشفير" }, { "_id": "6882e92ca4856cef96af78dd", "title": "الكتابة الإبداعية" }], "targetGroups": ["student", "teacher"], "gender": "all", "favorite": false }, { "_id": "68837a4932cee87c5f84f4ba", "title": "مسابقة الكيمياء الحيوية", "schedule": [{ "date": "2025-08-18T00:00:00.000Z", "times": [{ "startTime": "10:00", "endTime": "14:00" }] }], "categories": [{ "_id": "6882e92ba4856cef96af78d1", "title": "الكيمياء الحيوية" }, { "_id": "6882e92ba4856cef96af78d5", "title": "الفيزياء المتقدمة" }], "targetGroups": ["student_advisor"], "gender": "all", "favorite": false }, { "_id": "68837a4832cee87c5f84f4a6", "title": "ورشة الأمن السيبراني", "schedule": [{ "date": "2025-08-25T00:00:00.000Z", "times": [{ "startTime": "14:00", "endTime": "17:00" }] }], "categories": [{ "_id": "6882e931a4856cef96af7909", "title": "السلامة الرقمية" }, { "_id": "6882e931a4856cef96af7911", "title": "أمن المعلومات" }], "targetGroups": ["health_advisor"], "gender": "all", "favorite": false }, { "_id": "68837a4732cee87c5f84f497", "title": "ندوة الكتابة الإبداعية", "schedule": [{ "date": "2025-09-05T00:00:00.000Z", "times": [{ "startTime": "11:00", "endTime": "13:30" }] }], "categories": [{ "_id": "6882e92ba4856cef96af78d1", "title": "الكيمياء الحيوية" }, { "_id": "6882e92ca4856cef96af78dd", "title": "الكتابة الإبداعية" }], "targetGroups": ["student_advisor"], "gender": "girl", "favorite": false }, { "_id": "68837a4832cee87c5f84f4ab", "title": "معرض العلوم الطبيعية", "schedule": [{ "date": "2025-09-15T00:00:00.000Z", "times": [{ "startTime": "09:30", "endTime": "12:30" }] }], "categories": [{ "_id": "6882e92aa4856cef96af78cd", "title": "العلوم الطبيعية" }, { "_id": "6882e933a4856cef96af7921", "title": "المعارض العلمية" }], "targetGroups": ["student"], "gender": "girl", "favorite": false }, { "_id": "68837a4932cee87c5f84f4b5", "title": "يوم التطوع المجتمعي", "schedule": [{ "date": "2025-09-30T00:00:00.000Z", "times": [{ "startTime": "08:00", "endTime": "12:00" }] }], "categories": [{ "_id": "6882e930a4856cef96af78fd", "title": "التطوع المجتمعي" }], "targetGroups": ["parent", "student"], "gender": "all", "favorite": false }, { "_id": "68837a4932cee87c5f84f4b0", "title": "ورشة التصميم الجرافيكي", "schedule": [{ "date": "2025-10-01T00:00:00.000Z", "times": [{ "startTime": "13:00", "endTime": "15:30" }] }], "categories": [{ "_id": "6882e92aa4856cef96af78c5", "title": "التصميم الجرافيكي" }], "targetGroups": ["teacher"], "gender": "all", "favorite": false }, { "_id": "68837a4732cee87c5f84f49c", "title": "مؤتمر ريادة الأعمال المدرسية", "schedule": [{ "date": "2025-10-12T00:00:00.000Z", "times": [{ "startTime": "10:00", "endTime": "16:00" }] }], "categories": [{ "_id": "6882e92fa4856cef96af78f5", "title": "الموسيقى والفنون" }, { "_id": "6882e930a4856cef96af7901", "title": "ريادة الأعمال" }], "targetGroups": ["school_principal", "activity_leader"], "gender": "all", "favorite": false }]
        }
    };

    const today = new Date().toLocaleDateString('en-CA');

    const systemPrompt = `أنت "منظّم"، مساعد ذكاء اصطناعي فائق الكفاءة ومُتخصص في تنظيم وإدارة الفعاليات والمواعيد. تاريخ اليوم هو ${today}.

# شخصيتك:
- **الاسم:** منظّم
- **الأسلوب:** محترف، ودود، دقيق، ومباشر.
- **اللغة:** العربية الفصحى الواضحة والموجزة.

# مهمتك الأساسية:
تحليل بيانات الفعاليات المُقدمة لك بدقة، والإجابة على أسئلة المستخدمين المتعلقة بها **فقط**.

# قواعد صارمة لا يمكن تجاوزها:
1.  **الترتيب أولاً:** قبل عرض أي قائمة من الفعاليات، قم **دائمًا** بترتيبها ترتيبًا زمنيًا من الأقدم إلى الأحدث بناءً على تاريخ البدء.
2.  **الالتزام بالبيانات:** لا تقدم أي معلومات غير موجودة في قائمة الفعاليات. لا تخترع أو تخمن تفاصيل إضافية.
3.  **خارج النطاق:** إذا كان سؤال المستخدم لا يتعلق بالفعاليات، أجب بلباقة: "عفواً، أنا متخصص فقط في الإجابة على الأسئلة المتعلقة بالفعاليات والجداول الزمنية. هل لديك أي سؤال حول الفعاليات؟"
4.  **الفعاليات غير الموجودة:** إذا سأل المستخدم عن فعالية غير موجودة في قائمتك، أجب: "لم أجد فعالية بهذا الاسم في الجدول الحالي. هل تود البحث عن شيء آخر؟"

# كيفية الإجابة (مهم جدًا):
- **الفعاليات القادمة:** عند السؤال عن "أقرب فعالية"، استخدم تاريخ اليوم (${today}) كمرجع لتحديد الفعالية التالية في الجدول.
- **تنسيق القائمة:** عند طلب قائمة بالفعاليات (مثل "كل الايفنتات" أو "ما هي الفعاليات المتاحة؟")، يجب أن تبدأ الرد بجملة تمهيدية واضحة، ثم اعرض الفعاليات **مرتبة زمنيًا** باستخدام تنسيق Markdown التالي **بالضبط**:
  
  **مثال على الرد المطلوب:**
  بالتأكيد، هذه هي جميع الفعاليات القادمة مرتبة حسب التاريخ:

  - **ورشة الأنشطة المسرحية**
    - **التاريخ:** 2025-07-28
    - **الوقت:** 17:00 - 19:00
    - **التصنيفات:** الأنشطة المسرحية

  - **ورشة البرمجة باستخدام Python**
    - **التاريخ:** 2025-08-10
    - **الوقت:** 09:00 - 12:00
    - **التصنيفات:** البرمجة والتشفير, الكتابة الإبداعية

- **التفاصيل:** عند السؤال عن تفاصيل فعالية معينة، اذكر كل المعلومات المتاحة لك عنها بشكل منظم.

🔽 هذه هي قائمة الأحداث الحالية التي ستعمل عليها:
${JSON.stringify(eventsData.data)}
`;

    return `${systemPrompt}\n\nسؤال المستخدم: ${currentQuestion}`;
};

app.post('/api/chat', async (req: Request, res: Response) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ error: 'Question is required' });
        }

        const prompt = constructOrganizerPrompt(question);

        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.5, // تم زيادة درجة الحرارة قليلاً لإعطاء مرونة في صياغة الجمل
                topK: 32,
                topP: 0.9,
            }
        };

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is not defined in environment variables.");
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            console.error("Gemini API Error:", errorText);
            throw new Error(`API call failed with status: ${apiResponse.status}`);
        }

        const result: any = await apiResponse.json();

        let replyText = "عذرًا، حدث خطأ أثناء محاولة إنشاء رد. يرجى المحاولة مرة أخرى.";
        if (result?.candidates?.[0]?.content?.parts?.[0]?.text) {
            replyText = result.candidates[0].content.parts[0].text;
        }

        res.json({ reply: replyText });

    } catch (error) {
        console.error("Error in /api/chat:", error);
        res.status(500).json({ error: "An internal server error occurred." });
    }
});

app.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
});
