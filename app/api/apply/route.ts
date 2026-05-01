import { NextResponse } from "next/server";

type ApplyPayload = {
  name: string;
  business: string;
  interviewSeries: string;
  email: string;
  interests: string;
};

export async function POST(req: Request) {
  const webhookUrl = process.env.APPLY_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Missing APPLY_WEBHOOK_URL" },
      { status: 500 }
    );
  }

  let payload: ApplyPayload;

  try {
    payload = (await req.json()) as ApplyPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!payload.name || !payload.business || !payload.email || !payload.interests) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const interviewAnswer =
    payload.interviewSeries === "ja"
      ? "Ja, gerne"
      : payload.interviewSeries === "nein"
        ? "Nein, danke"
        : payload.interviewSeries || "-";

  const discordMessage = {
    content: "Neue Bewerbung für den Lucky Founders Club",
    embeds: [
      {
        title: "Kontaktformular",
        color: 16733524,
        fields: [
          { name: "Name", value: payload.name },
          { name: "Business / Idee", value: payload.business },
          {
            name: "Interview-Serie auf Instagram",
            value: interviewAnswer,
            inline: true,
          },
          { name: "E-Mail", value: payload.email, inline: true },
          { name: "Gründungs-Interessen", value: payload.interests },
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const webhookRes = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordMessage),
    });

    if (!webhookRes.ok) {
      return NextResponse.json(
        { error: "Webhook rejected request" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to call webhook" },
      { status: 502 }
    );
  }
}
