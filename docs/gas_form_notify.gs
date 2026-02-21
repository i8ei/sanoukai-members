/**
 * Googleフォーム回答通知（事務局通知 + 申込者自動返信）
 *
 * 使い方:
 * 1) フォーム回答先スプレッドシートを開く
 * 2) 拡張機能 > Apps Script を開く
 * 3) このコードを貼り付けて保存
 * 4) トリガー追加: onFormSubmit / イベントのソース=スプレッドシート / イベント=フォーム送信時
 */

const CONFIG = {
  // 事務局通知先（必要に応じて複数可）
  officeEmails: ['office@example.com'],
  // 送信者表示名
  senderName: '佐賀県農業法人協会 事務局',
  // 一次返信の目安日数
  replyBusinessDays: '3',
};

function onFormSubmit(e) {
  const row = e.namedValues || {};

  // 質問文ゆれに強い取得（完全一致→部分一致）
  const corp = pickSmart(row, ['法人名']);
  const person = pickSmart(row, ['ご担当者名', '担当者名']);
  const mail = pickSmart(row, ['メールアドレス', 'メール']);
  const phone = pickSmart(row, ['電話番号', '電話']);
  const area = pickSmart(row, ['所在地（市町まで）', '所在地']);
  const crops = pickSmart(row, ['主な作目・事業内容', '作目', '事業内容']);
  const contactPref = pickSmart(row, ['希望連絡方法', '連絡方法']);
  const contactTime = pickSmart(row, ['希望連絡時間帯', '連絡時間帯']);
  const when = pickSmart(row, ['入会希望時期', '希望時期']);
  const message = pickSmart(row, ['お問い合わせ内容', '相談内容']);
  const note = pickSmart(row, ['備考']);
  const timestamp = pickSmart(row, ['タイムスタンプ']);

  // デバッグ用: 実際のフォーム項目キーを通知末尾に添付
  const keysDump = Object.keys(row).map((k) => `- ${k}`).join('\n');

  // 1) 事務局通知
  const officeSubject = `【要対応】入会相談フォーム新規受付（${corp || '法人名未入力'}）`;
  const officeBody = [
    '佐賀県農業法人協会サイトの入会相談フォームに、新しい回答が届きました。',
    '',
    '■受付情報',
    `- 受付日時：${timestamp}`,
    `- 法人名：${corp}`,
    `- ご担当者名：${person}`,
    `- メール：${mail}`,
    `- 電話：${phone}`,
    `- 所在地：${area}`,
    `- 主な作目・事業内容：${crops}`,
    `- 希望連絡方法：${contactPref}`,
    `- 希望連絡時間帯：${contactTime}`,
    `- 入会希望時期：${when}`,
    `- お問い合わせ内容：${message}`,
    `- 備考：${note}`,
    '',
    '■推奨対応フロー',
    '1) 24時間以内に一次返信',
    '2) 担当者決定と連絡手段確定',
    '3) 対応ステータス更新（対応中→対応済み）',
    '',
    '---',
    'フォーム項目キー（初期調整用）',
    keysDump,
  ].join('\n');

  GmailApp.sendEmail(CONFIG.officeEmails.join(','), officeSubject, officeBody, {
    name: CONFIG.senderName,
  });

  // 2) 申込者自動返信（メールアドレスがある場合のみ）
  if (mail) {
    const userSubject = '【佐賀県農業法人協会】お問い合わせを受け付けました';
    const userBody = [
      `${corp || ''}`,
      `${person || ''} 様`,
      '',
      'このたびは、佐賀県農業法人協会へお問い合わせいただきありがとうございます。',
      '以下の内容で受け付けました。',
      '',
      `- 法人名：${corp}`,
      `- ご担当者名：${person}`,
      `- メール：${mail}`,
      `- 電話：${phone}`,
      `- 主な作目・事業内容：${crops}`,
      `- お問い合わせ内容：${message}`,
      '',
      `内容を確認のうえ、事務局より${CONFIG.replyBusinessDays}営業日以内を目安にご連絡いたします。`,
      'お急ぎの場合は本メールへご返信ください。',
      '',
      '佐賀県農業法人協会 事務局',
    ].join('\n');

    GmailApp.sendEmail(mail, userSubject, userBody, {
      name: CONFIG.senderName,
      replyTo: CONFIG.officeEmails[0],
    });
  }
}

function pickSmart(namedValues, candidateLabels) {
  // 1) 完全一致
  for (const label of candidateLabels) {
    const v = namedValues[label];
    if (Array.isArray(v) && v[0]) return String(v[0]).trim();
    if (typeof v === 'string' && v) return v.trim();
  }

  // 2) 部分一致（全角記号や補足文が付く場合に対応）
  const normalizedKeys = Object.keys(namedValues);
  for (const key of normalizedKeys) {
    const nk = normalizeKey(key);
    for (const label of candidateLabels) {
      const nl = normalizeKey(label);
      if (nk.includes(nl) || nl.includes(nk)) {
        const v = namedValues[key];
        if (Array.isArray(v) && v[0]) return String(v[0]).trim();
        if (typeof v === 'string' && v) return v.trim();
      }
    }
  }
  return '';
}

function normalizeKey(s) {
  return String(s)
    .toLowerCase()
    .replace(/[\s\u3000]/g, '')
    .replace(/[（）()【】\[\]：:・]/g, '');
}
