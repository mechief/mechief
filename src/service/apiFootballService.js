export const FIXTURE_STATUS = {
  TBD: {
    code: -11,
    text: '일정 미정',
  },
  NS: {
    code: -1,
    text: '경기 전',
  },
  '1H': {
    code: 1,
    text: '전반',
  },
  HT: {
    code: 9,
    text: '하프타임',
  },
  '2H': {
    code: 2,
    text: '후반',
  },
  ET: {
    code: 11,
    text: '연쟝전',
  },
  P: {
   code: 21,
   text: '승부차기', 
  },
  FT: {
    code: 0,
    text: '경기 종료',
  },
  AET: {
    code: 0,
    text: '경기 종료',
  },
  PEN: {
    code: 0,
    text: '경기 종료',
  },
  BT: {
    code: 12,
    text: '',
  },
  SUSP: {
    code: -12,
    text: '경기 지연',
  },
  INT: {
    code: -13,
    text: '경기 중단',
  },
  PST: {
    code: -14,
    text: '연기',
  },
  CANC: {
    code: -15,
    text: '경기 취소',
  },
  ABD: {
    code: -16,
    text: '기권',
  },
  AWD: {
    code: -17,
    text: '',
  },
  WO: {
    code: -18,
    text: '',
  },
  LIVE: {
    code: -19,
    text: '',
  },    
}

export const SERVICE_LEAGUES = {
  // 리그
  '39': {
    name: 'Premier League',
    nameKr: '프리미어 리그',
    type: 'league',
  },
  '61': {
    name: 'Ligue 1',
    nameKr: '리그 앙',
    type: 'league',
  },
  '78': {
    name: 'Bundesliga',
    nameKr: '분데스리가',
    type: 'league',
  },
  '135': {
    name: 'Serie A',
    nameKr: '세리에 A',
    type: 'league',
  },
  '140': {
    name: 'La Liga',
    nameKr: '라 리가',
    type: 'league',
  },
  // 유럽대항전
  '2': {
    name: 'UEFA Champions League',
    nameKr: 'UEFA 챔피언스 리그',
    type: 'cup',
  },
  '3': {
    name: 'UEFA Europa League',
    nameKr: '유로파 리그',
    type: 'cup',
  },
  '531': {
    name: 'UEFA Super Cup',
    nameKr: 'UEFA 슈퍼컵',
    type: 'cup',
  },
  '848': {
    name: 'UEFA Europa Conference League',
    nameKr: '유로파 컨퍼런스 리그',
    type: 'cup',
  },
  // 잉글랜드 컵
  '45': {
    name: 'FA Cup',
    nameKr: 'FA컵',
    type: 'cup',
  },
  '48': {
    name: 'League Cup',
    nameKr: '잉글랜드 리그 컵',
    type: 'cup',
  },
  '528': {
    name: 'Community Shield',
    nameKr: '커뮤니티 쉴드',
    type: 'cup',
  },
  // 프랑스 컵
  '65': {
    name: 'Coupe de la Ligue',
    nameKr: '프랑스 리그 컵',
    type: 'cup',
  },
  '66': {
    name: 'Coupe de France',
    nameKr: '쿠프 드 프랑스',
    type: 'cup',
  },
  '526': {
    name: 'Trophée des champions',
    nameKr: '트로페 데 샹피옹',
    type: 'cup',
  },
  // 스페인 컵
  '143': {
    name: 'Copa del Rey',
    nameKr: '코파 델 레이',
    type: 'cup',
  },
  '556': {
    name: 'Super Cup',
    nameKr: '스페인 슈퍼컵',
    type: 'cup',
  },
  // 이탈리아 컵
  '137': {
    name: 'Coppa Italia',
    nameKr: '코파 이탈리아',
    type: 'cup',
  },
  '547': {
    name: 'Super Cup',
    nameKr: '이탈리아 슈퍼컵',
    type: 'cup',
  },
  // 독일 컵
  '81': {
    name: 'DFB Pokal',
    nameKr: 'DFB 포칼컵',
    type: 'cup',
  },
  '529': {
    name: 'Super Cup',
    nameKr: '독일 슈퍼컵',
    type: 'cup',
  },
}

export const isServiceLeague = (leagueId) => {
  const id = typeof leagueId === 'number' ? leagueId.toString() : leagueId;

  return SERVICE_LEAGUES.hasOwnProperty(id);
}

export const getLeagueNameKr = (leagueId) => {
  const id = typeof leagueId === 'number' ? leagueId.toString() : leagueId;

  if (!isServiceLeague(id)) {
    return null;
  }

  return SERVICE_LEAGUES[id].nameKr;
}