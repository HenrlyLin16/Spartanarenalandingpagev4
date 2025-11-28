import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'zh';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  nav: {
    market: "Market",
    spot: "Spot",
    futures: "Futures",
    spartans: "300 SPARTANS",
    campaign: "Campaign",
    more: "More",
    deposit: "Deposit",
    connect_wallet: "Connect Wallet",
    login: "Login",
    register: "Register",
  },
  hero: {
    official_tournament: "Official Tournament",
    title: "SPARTANS Arena",
    subtitle: "300 SPARTANS: The Ultimate AI Algo Battle",
    date: "2025-12-15 to 2026-01-XX",
    register_now: "Register Now",
    complete_profile: "Complete Profile",
    my_assets: "My Assets",
    create_bot: "Create Bot",
    prize_pool: "Prize Pool",
    spartans: "SPARTANS",
    top_roi: "Top ROI",
    login_required: "Login Required",
    login_msg: "Please login or register to create a bot for the SPARTANS Arena.",
    login_now: "Login Now",
    cancel: "Cancel",
    later: "Later",
  },
  dashboard: {
    title: "My Bots Dashboard",
    auto_refresh: "Auto-refreshing",
    no_bots_title: "You don't have any participating bots",
    no_bots_msg: "Create a bot now to join the arena and win prizes!",
    create_bot: "Create Bot",
    col_bot_info: "Bot Info",
    col_valid_vol: "Valid Vol (USDT)",
    col_pnl: "PnL (USDT)",
    col_roi: "ROI",
    col_rank_a: "Rank A",
    col_rank_b: "Rank B",
    col_status: "Status",
    col_actions: "Actions",
    status_active: "Active",
    status_pending: "Pending",
    status_disqualified: "Disqualified",
    status_low_vol: "Low Vol",
    btn_details: "Details",
    score_algorithm: "Score Algorithm",
  },
  leaderboard: {
    tab_roi: "Leaderboard-A (ROI)",
    tab_volume: "Leaderboard-B (Volume)",
    criteria_title: "Qualification Criteria",
    criteria_desc: "Participants must complete at least 1 valid trade to be eligible for prizes.\nTop 10 winners share $25,000 | Top 11-50 share $25,000.",
    volume_unlock_title: "Volume Beast Unlock",
    volume_unlock_tooltip: "Global trading volume unlocks higher prize pools. Wash trading is excluded.",
    current_pool: "Current Pool Unlocked",
    target_completion: "Target Completion",
    goal: "Goal",
  },
  bot_card: {
    roi: "ROI",
    vol: "Vol",
    pnl: "PnL",
    max_dd: "Max DD",
    win_rate: "Win Rate",
    qualified: "Qualified",
    not_qualified: "Not Qualified",
    pending: "Pending",
    featured: "Featured",
    kol: "KOL Partner",
    btn_activity: "Activity",
    btn_copy: "Copy",
    btn_subscribe: "Subscribe",
    status_qualified_tooltip: "Met volume and ROI requirements",
    status_pending_tooltip: "Requirements not yet met",
  },
  common: {
    description: "Description:",
    note: "Note:",
  },
  tooltips: {
    score: {
      title: "Comprehensive Score (0-100)",
      formula: "[(Current NAV / Max NAV) + (Current PnL / Max PnL)] × 50",
      description: "Comparison with its own historical peak, encouraging continuous growth."
    },
    nav: {
      title: "Net Asset Value (NAV)",
      formula: "Subscription + Current PnL",
      description: "Total USDT value of the bot pool."
    },
    pnl: {
      title: "Profit and Loss (PnL)",
      description: "Cumulative profit/loss (Realized + Unrealized). Green for profit, Red for loss."
    },
    max_drawdown: {
      title: "Max Drawdown",
      description: "Maximum percentage drop from peak to trough. Lower is lower risk."
    },
    win_rate: {
      title: "Win Rate",
      description: "Percentage of profitable orders. Higher means better stability."
    },
    plan_b_nav: {
      title: "Current NAV",
      formula: "Subscription + Current PnL",
      description: "Threshold ≥ max(500 USDT, Median × 120%)"
    },
    growth: {
      title: "7D NAV Growth",
      formula: "(Current NAV - NAV 7d ago) / NAV 7d ago × 100%",
      description: "Reflects the growth speed of capital scale."
    },
    aum: {
      title: "Assets Under Management (AUM)",
      description: "Total funds managed by the bot, including subscription funds."
    },
    current_pnl: {
      title: "Current PnL",
      description: "Current cumulative PnL (USDT). Only profitable bots (PnL ≥ 0) are ranked here."
    },
    avg_pnl: {
      title: "7D Avg PnL (Ranking Basis)",
      description: "Average PnL over last 7 days. Uses moving average to reduce volatility."
    },
    peak_pnl: {
      title: "Peak PnL",
      description: "Highest historical PnL achieved. Used to evaluate max potential."
    }
  },
  terms: {
    title: "Terms & Conditions",
    last_updated: "Last updated: December 2025",
    expand: "Expand Full Terms",
    copy_success: "Copied to clipboard",
    item_1_title: "1. Eligibility",
    item_1_content: "Participation in the Spartan Arena is open to individuals who are at least 18 years of age and maintain a valid OneBullEx account. Builders submitting strategies must provide accurate personal information and original strategy inputs, including signals, regimes, and risk frameworks. Users engaging with the Arena acknowledge the risks associated with algorithmic trading and accept full responsibility for their trading decisions.",
    item_2_title: "2. Strategy Submission Requirements",
    item_2_content: "Builders agree to submit authentic, original strategies that reflect their own work. Coding is not required; however, each Builder must supply enough detail for the Arena team to validate and execute the strategy correctly. Strategies may not contain plagiarized content, artificially engineered performance data, or misleading risk structures. Submissions designed to manipulate results, mislead users, or exploit the Arena system are strictly prohibited and may result in permanent removal.",
    item_3_title: "3. Validation and Testing Process",
    item_3_content: "All submitted Bots undergo professional testing through an internal evaluation pipeline. This includes regime segmentation, forward testing, correlation analysis, drawdown and volatility review, and OMS execution simulation. A strategy may be accepted or rejected based on its behavior, stability, clarity of logic, and similarity to existing systems. Throughout this process, Builder intellectual property remains protected through a signals-only protocol that ensures the underlying logic and formulas are never exposed.",
    item_4_title: "4. Arena Competition Cycle",
    item_4_content: "Once approved, a strategy enters the Arena cycle, which consists of a build period, an internal testing period, a live competition stage, and the final ranking phase. At the conclusion of the competition, top-performing Bots may enter the Go-Live stage where users can subscribe to them. Timelines within the cycle may be adjusted at OneBullEx’s discretion to ensure fairness and operational stability.",
    item_5_title: "5. Ranking and Scoring",
    item_5_content: "Arena rankings are determined entirely through automated evaluation based on real-time performance metrics. These include profitability, drawdown discipline, execution consistency, volatility and risk management, and how well the Bot behaves within its intended market regime. Bots must operate consistently with the logic declared by the Builder. Any attempt to manipulate scoring, artificially influence results, or interfere with the Arena system may result in suspension or permanent removal.",
    item_6_title: "6. Rewards and Revenue Share",
    item_6_content: "Builders participating in the Arena may earn competitive rewards, including seasonal prize pools, monthly Top 10 awards, and a lifetime revenue share of 20% of trading fees generated by users who subscribe to their Bot. All rewards are subject to compliance checks and may be withheld or cancelled if fraudulent activity, suspicious behavior, or rule violations are identified. Reward distribution timelines may vary based on operational requirements.",
    item_7_title: "7. Intellectual Property",
    item_7_content: "Builders retain full ownership of their strategy logic, models, and proprietary methods. By submitting a Bot into the Arena, Builders grant OneBullEx a limited operational license to execute, evaluate, and display performance metrics derived from the strategy. Performance data may be presented publicly to ensure transparency, but no internal code, formulas, or proprietary logic will be disclosed at any time.",
    item_8_title: "8. Transparency of Performance Data",
    item_8_content: "To ensure trust and fairness, the Spartan Arena publicly displays performance-related information for all active Bots. This includes executed trades, timestamps, PnL, drawdown, exposure, regime breakdowns, and performance curves. Builders acknowledge and agree that transparency is a requirement for participation and that users rely on these metrics to make informed decisions.",
    item_9_title: "9. Offboarding and Resurrection",
    item_9_content: "A Bot may be temporarily removed from the Arena if its behavior deviates significantly from its declared logic, violates established risk parameters, or becomes unstable or unsafe for users. In such cases, builders may update or refine the strategy and submit a request for re-evaluation. Re-entry into the Arena (“Resurrection”) is not guaranteed and is subject to internal review.",
    item_10_title: "10. User Responsibilities",
    item_10_content: "Users interacting with Bots acknowledge that algorithmic trading involves significant financial risk, including unexpected performance shifts, market volatility, and potential losses. Users agree not to manipulate rankings, misuse strategy outputs, engage in multi-accounting, or illegally share signals. Users must act responsibly and in accordance with platform rules.",
    item_11_title: "11. Prohibited Actions",
    item_11_content: "All participants are prohibited from submitting fraudulent or plagiarized strategies, manipulating Arena results, interfering with system functionality, exploiting bugs, reverse-engineering platform behavior, or creating multiple accounts to gain unfair advantage. Misrepresentation of identity, performance, or strategy details may lead to immediate suspension or permanent disqualification.",
    item_12_title: "12. Amendments",
    item_12_content: "OneBullEx may modify or update these Terms at any time. Any changes will be published through official OneBullEx channels, and continued participation in the Arena constitutes acceptance of the updated Terms. Participants are responsible for reviewing the latest version of the Terms & Conditions.",
    item_13_title: "13. Contact",
    item_13_content: "For questions, support, or technical assistance regarding participation in the Spartan Arena, Builders and Users may contact: support@onebullex.com",
  },
  countdown: {
    starts_in: "Competition Starts In",
    ends_in: "Competition Ends In",
    ended: "Competition Ended",
    status: "Event Status",
    days: "Days",
    hours: "Hours",
    mins: "Mins",
    secs: "Secs",
  },
  footer: {
    risk_warning_title: "High-Risk Algorithm Trading Disclosure",
    risk_warning_content: "Trading cryptocurrencies using automated algorithms carries extremely high risks. Past performance shown in this competition does not guarantee future results. You may lose all or more than your initial investment. Leverage trading amplifies both gains and losses. You should not invest money you cannot afford to lose. Please ensure you fully understand the risks and seek independent advice if necessary.",
    need_help: "Need Help? Contact Support",
    customer_support: "Customer Support",
    scan_qr: "Scan QR Code to join our Telegram support",
    or_contact: "Or contact us via:",
    rights_reserved: "All rights reserved.",
    competition_name: "300 SPARTANS Arena - AI Algo Trading Competition",
  }
};

const translationsZh: Translations = {
  nav: {
    market: "市场",
    spot: "现货",
    futures: "合约",
    spartans: "300 SPARTANS",
    campaign: "活动中心",
    more: "更多",
    deposit: "充值",
    connect_wallet: "连接钱包",
    login: "登录",
    register: "注册",
  },
  hero: {
    official_tournament: "官方锦标赛",
    title: "SPARTANS Arena",
    subtitle: "300 SPARTANS 勇士：终极 AI 算法之战",
    date: "2025-12-15 至 2026-01-XX",
    register_now: "立即报名",
    complete_profile: "完善资料",
    my_assets: "我的资产",
    create_bot: "创建策略 Bot",
    prize_pool: "总奖池",
    spartans: "参赛勇士",
    top_roi: "最高收益率",
    login_required: "需登录参与",
    login_msg: "请登录或注册以创建 SPARTANS Arena 参赛机器人。",
    login_now: "立即登录",
    cancel: "取消",
    later: "稍后",
  },
  dashboard: {
    title: "我的策略看板",
    auto_refresh: "自动刷新",
    no_bots_title: "暂无参赛机器人",
    no_bots_msg: "立即创建策略机器人，角逐高额奖金！",
    create_bot: "创建策略 Bot",
    col_bot_info: "机器人信息",
    col_valid_vol: "有效交易量 (USDT)",
    col_pnl: "盈亏 (USDT)",
    col_roi: "收益率",
    col_rank_a: "收益榜排名",
    col_rank_b: "交易量排名",
    col_status: "状态",
    col_actions: "操作",
    status_active: "运行中",
    status_pending: "审核中",
    status_disqualified: "已取消",
    status_low_vol: "量不足",
    btn_details: "详情",
    score_algorithm: "得分算法",
  },
  leaderboard: {
    tab_roi: "收益总榜 (ROI)",
    tab_volume: "交易量解锁榜 (Volume)",
    criteria_title: "上榜资格",
    criteria_desc: "参赛者需完成至少 1 笔有效交易方可获奖。\nTop 10 分享 $25,000 | Top 11-50 分享 $25,000。",
    volume_unlock_title: "交易量奖池解锁",
    volume_unlock_tooltip: "全网有效总交易量将解锁更高阶奖池。自成交/对敲交易不计入。",
    current_pool: "当前已解锁奖池",
    target_completion: "目标达成率",
    goal: "目标",
  },
  bot_card: {
    roi: "收益率",
    vol: "交易量",
    pnl: "盈亏",
    max_dd: "最大回撤",
    win_rate: "胜率",
    qualified: "已达标",
    not_qualified: "未达标",
    pending: "审核中",
    featured: "精选",
    kol: "合作 KOL",
    btn_activity: "交易动态",
    btn_copy: "一键跟单",
    btn_subscribe: "订阅",
    status_qualified_tooltip: "已满足交易量与收益率要求",
    status_pending_tooltip: "暂未满足上榜要求",
  },
  common: {
    description: "说明：",
    note: "注：",
  },
  tooltips: {
    score: {
      title: "综合得分 (0-100分)",
      formula: "[(当前NAV/最高NAV) + (当前PnL/最高PnL)] × 50",
      description: "与自身历史峰值对比，鼓励持续成长"
    },
    nav: {
      title: "净资产价值 (Net Asset Value)",
      formula: "订阅金额 + 当前PnL",
      description: "机器人池的总USDT价值"
    },
    pnl: {
      title: "盈亏 (Profit and Loss)",
      description: "机器人当前累计盈亏（已实现 + 未实现），绿色表示盈利，红色表示亏损"
    },
    max_drawdown: {
      title: "最大回撤",
      description: "从历史峰值到最低点的最大跌幅百分比，数值越小风险越低"
    },
    win_rate: {
      title: "胜率",
      description: "盈利订单数占总订单数的百分比，数值越高表示策略稳定性越好"
    },
    plan_b_nav: {
      title: "当前净资产价值",
      formula: "订阅金额 + 当前PnL",
      description: "入榜门槛 ≥ max(500 USDT, 全场30日NAV中位数 × 120%)"
    },
    growth: {
      title: "7日NAV增长率",
      formula: "(当前NAV - 7天前NAV) / 7天前NAV × 100%",
      description: "反映资金规模增长速度"
    },
    aum: {
      title: "管理资产规模 (Assets Under Management)",
      description: "机器人管理的总资金规模，包含订阅托管资金"
    },
    current_pnl: {
      title: "当前盈亏",
      description: "机器人当前累计盈亏金额（USDT），本榜单仅统计PnL ≥ 0的盈利机器人"
    },
    avg_pnl: {
      title: "7日移动平均PnL (排序依据)",
      description: "最近7天的平均盈亏金额，采用移动平均降低单日波动影响"
    },
    peak_pnl: {
      title: "历史最高PnL",
      description: "该机器人历史记录中达到的最高盈利金额，用于评估盈利能力上限"
    }
  },
  terms: {
    title: "活动条款与细则",
    last_updated: "Last updated: December 2025",
    expand: "查看完整条款",
    copy_success: "已复制到剪贴板",
    item_1_title: "1. Eligibility",
    item_1_content: "Participation in the Spartan Arena is open to individuals who are at least 18 years of age and maintain a valid OneBullEx account. Builders submitting strategies must provide accurate personal information and original strategy inputs, including signals, regimes, and risk frameworks. Users engaging with the Arena acknowledge the risks associated with algorithmic trading and accept full responsibility for their trading decisions.",
    item_2_title: "2. Strategy Submission Requirements",
    item_2_content: "Builders agree to submit authentic, original strategies that reflect their own work. Coding is not required; however, each Builder must supply enough detail for the Arena team to validate and execute the strategy correctly. Strategies may not contain plagiarized content, artificially engineered performance data, or misleading risk structures. Submissions designed to manipulate results, mislead users, or exploit the Arena system are strictly prohibited and may result in permanent removal.",
    item_3_title: "3. Validation and Testing Process",
    item_3_content: "All submitted Bots undergo professional testing through an internal evaluation pipeline. This includes regime segmentation, forward testing, correlation analysis, drawdown and volatility review, and OMS execution simulation. A strategy may be accepted or rejected based on its behavior, stability, clarity of logic, and similarity to existing systems. Throughout this process, Builder intellectual property remains protected through a signals-only protocol that ensures the underlying logic and formulas are never exposed.",
    item_4_title: "4. Arena Competition Cycle",
    item_4_content: "Once approved, a strategy enters the Arena cycle, which consists of a build period, an internal testing period, a live competition stage, and the final ranking phase. At the conclusion of the competition, top-performing Bots may enter the Go-Live stage where users can subscribe to them. Timelines within the cycle may be adjusted at OneBullEx’s discretion to ensure fairness and operational stability.",
    item_5_title: "5. Ranking and Scoring",
    item_5_content: "Arena rankings are determined entirely through automated evaluation based on real-time performance metrics. These include profitability, drawdown discipline, execution consistency, volatility and risk management, and how well the Bot behaves within its intended market regime. Bots must operate consistently with the logic declared by the Builder. Any attempt to manipulate scoring, artificially influence results, or interfere with the Arena system may result in suspension or permanent removal.",
    item_6_title: "6. Rewards and Revenue Share",
    item_6_content: "Builders participating in the Arena may earn competitive rewards, including seasonal prize pools, monthly Top 10 awards, and a lifetime revenue share of 20% of trading fees generated by users who subscribe to their Bot. All rewards are subject to compliance checks and may be withheld or cancelled if fraudulent activity, suspicious behavior, or rule violations are identified. Reward distribution timelines may vary based on operational requirements.",
    item_7_title: "7. Intellectual Property",
    item_7_content: "Builders retain full ownership of their strategy logic, models, and proprietary methods. By submitting a Bot into the Arena, Builders grant OneBullEx a limited operational license to execute, evaluate, and display performance metrics derived from the strategy. Performance data may be presented publicly to ensure transparency, but no internal code, formulas, or proprietary logic will be disclosed at any time.",
    item_8_title: "8. Transparency of Performance Data",
    item_8_content: "To ensure trust and fairness, the Spartan Arena publicly displays performance-related information for all active Bots. This includes executed trades, timestamps, PnL, drawdown, exposure, regime breakdowns, and performance curves. Builders acknowledge and agree that transparency is a requirement for participation and that users rely on these metrics to make informed decisions.",
    item_9_title: "9. Offboarding and Resurrection",
    item_9_content: "A Bot may be temporarily removed from the Arena if its behavior deviates significantly from its declared logic, violates established risk parameters, or becomes unstable or unsafe for users. In such cases, builders may update or refine the strategy and submit a request for re-evaluation. Re-entry into the Arena (“Resurrection”) is not guaranteed and is subject to internal review.",
    item_10_title: "10. User Responsibilities",
    item_10_content: "Users interacting with Bots acknowledge that algorithmic trading involves significant financial risk, including unexpected performance shifts, market volatility, and potential losses. Users agree not to manipulate rankings, misuse strategy outputs, engage in multi-accounting, or illegally share signals. Users must act responsibly and in accordance with platform rules.",
    item_11_title: "11. Prohibited Actions",
    item_11_content: "All participants are prohibited from submitting fraudulent or plagiarized strategies, manipulating Arena results, interfering with system functionality, exploiting bugs, reverse-engineering platform behavior, or creating multiple accounts to gain unfair advantage. Misrepresentation of identity, performance, or strategy details may lead to immediate suspension or permanent disqualification.",
    item_12_title: "12. Amendments",
    item_12_content: "OneBullEx may modify or update these Terms at any time. Any changes will be published through official OneBullEx channels, and continued participation in the Arena constitutes acceptance of the updated Terms. Participants are responsible for reviewing the latest version of the Terms & Conditions.",
    item_13_title: "13. Contact",
    item_13_content: "For questions, support, or technical assistance regarding participation in the Spartan Arena, Builders and Users may contact: support@onebullex.com",
  },
  countdown: {
    starts_in: "距离开始",
    ends_in: "距离结束",
    ended: "活动已结束",
    status: "活动状态",
    days: "天",
    hours: "时",
    mins: "分",
    secs: "秒",
  },
  footer: {
    risk_warning_title: "高风险算法交易披露",
    risk_warning_content: "使用自动算法交易加密货币具有极高的风险。本次比赛中展示的过往表现并不能保证未来的结果。您可能会损失全部或超过初始投资的资金。杠杆交易会放大收益和损失。您不应投资您无法承受损失的资金。请确保您充分了解风险，并在必要时寻求独立建议。",
    need_help: "需要帮助？联系客服",
    customer_support: "客户支持",
    scan_qr: "扫描二维码加入我们的 Telegram 支持群",
    or_contact: "或者通过以下方式联系我们：",
    rights_reserved: "保留所有权利。",
    competition_name: "300 SPARTANS Arena - AI 算法交易大赛",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (path: string) => {
    const keys = path.split('.');
    let current: any = language === 'zh' ? translationsZh : translations;
    
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation missing for key: ${path} in language: ${language}`);
        return path;
      }
      current = current[key];
    }
    
    return current as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}