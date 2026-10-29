import {verificationApiUrl} from './verification';

// Shared display facts and current service states. Do not add unapproved sales terms.
export const verificationIsLive = Boolean(verificationApiUrl);

export const officialInfo = {
  brandName: '绘屿造物',
  brandLatinName: 'Lumen Auralis',
  servicePhone: '19988424290',
  serviceHours: '工作日 10:00—17:00',
  courier: 'XX快递',
  productLeadTime: '现货预计 10 个工作日内寄出；预定裸娃预计 120—150 个工作日内寄出；预定全套预计 150—180 个工作日内寄出',
  productLeadTimeStarts: '预定商品从同一笔淘宝订单完成“确认收货”的日期起算',
  productDetailsSource: '实际配置以付款前商品页面及订单中确认的信息为准；预定商品的《云笺》会再次列明本次订单内容',
  productionConfirmation: '预定商品付清款项后寄出《云笺》；收到并核对无误后，请通过原淘宝订单发送《云笺》照片并告知客服同意开始制作。客服回复确认后，按已向淘宝平台核实的流程完成同一笔订单的“确认收货”，预定商品随后进入制作流程。',
  dailyCare: '避光、避高温保存；深色衣物穿戴前做好防染隔离',
} as const;

export const productLeadTimeNote = `${officialInfo.productLeadTime}。${officialInfo.productLeadTimeStarts}。`;

export const officialServiceCopy = {
  purchase: `请使用角色页面的官方购买入口，付款前核对商品配置、总价与交付安排。${officialInfo.productionConfirmation}订单修改、取消与退款的具体规则请阅读购买须知，并以付款前确认的销售说明及订单信息为准。`,
  afterSales: '收到作品后，请对照订单、《云笺》及随附清单核对；发现漏件、运输损伤或明显异常，建议在签收作品后一周内通过原淘宝订单联系客服。质量问题与必要运费依适用法律、订单约定和淘宝平台规则处理；具体办理说明见购买须知。',
  transfer: '尚未交付的订单如需转让，请由原下单人通过原淘宝订单联系客服，确认能否转单及办理流程。收货后的二手交易请核对作品状态、娃证与购买凭证。具体规则见购买与使用说明。',
  verification: verificationIsLive
    ? '正式核验已接入：请从本网站进入防伪页，使用娃证编号和对应购买订单号查询。核验结果不替代交易平台订单与售后凭证。'
    : '正式防伪核验暂未开放；当前防伪页只展示虚构样例，请勿填写真实娃证或订单信息。',
} as const;
