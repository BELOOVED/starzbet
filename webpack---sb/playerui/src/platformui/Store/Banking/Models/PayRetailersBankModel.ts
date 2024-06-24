/**
 * ISPB Code: {
 *  code: bankCode,
 *  name: bankName,
 * }
 *
 * ISPB -> uniq value,
 * code -> duplicate for some banks
 *
 * References:
 *  https://payretailers.readme.io/reference/payout-parameters#bank-name
 *  https://www.conta-corrente.com/codigo-dos-bancos/
 */
import { keys } from "@sb/utils/Keys";
import { getSelectOptions, type ISelectOption } from "../../../../common/Components/Field/SelectModel";

type TPayRetailersBankModel = Record<string, { code: string; name: string; }>

const payRetailersBankModel = {
  "10264663": {
    code: "081",
    name: "BBN BANCO BRASILEIRO DE NEGOCIOS S.A",
  },
  "10398952": {
    code: "133",
    name: "CRESOL CONFEDERAÇÃO",
  },
  "10573521": {
    code: "323",
    name: "Mercado Pago - conta do Mercado Livre",
  },
  "10664513": {
    code: "121",
    name: "BANCO AGIBANK S.A",
  },
  "10690848": {
    code: "083",
    name: "BANCO DA CHINA BRASIL S.A",
  },
  "10853017": {
    code: "138",
    name: "GET MONEY CC LTDA",
  },
  "10866788": {
    code: "024",
    name: "BCO BANDEPE S.A",
  },
  "11703662": {
    code: "095",
    name: "BANCO CONFIDENCE DE CÂMBIO S.A",
  },
  "11758741": {
    code: "094",
    name: "BANCO FINAXIS",
  },
  "11932017": {
    code: "118",
    name: "STANDARD CHARTERED BI S.A",
  },
  "11970623": {
    code: "276",
    name: "SENFF S.A",
  },
  "12586596": {
    code: "137",
    name: "MULTIMONEY CC LTDA",
  },
  "12865507": {
    code: "092",
    name: "BRK S.A",
  },
  "13009717": {
    code: "047",
    name: "BANCO BCO DO ESTADO DE SERGIPE S.A",
  },
  "13059145": {
    code: "144",
    name: "BEXS BANCO DE CAMBIO S.A.",
  },
  "13220493": {
    code: "126",
    name: "BR PARTNERS BI",
  },
  "13370835": {
    code: "301",
    name: "BPP INSTITUIÇÃO DE PAGAMENTOS S.A",
  },
  "13486793": {
    code: "173",
    name: "BRL TRUST DTVM SA",
  },
  "13720915": {
    code: "119",
    name: "BANCO WESTERN UNION",
  },
  "14388334": {
    code: "254",
    name: "PARANA BANCO S.A",
  },
  "14511781": {
    code: "268",
    name: "BARIGUI CH",
  },
  "15114366": {
    code: "107",
    name: "BANCO BOCOM BBM S.A",
  },
  "15173776": {
    code: "412",
    name: "BANCO CAPITAL S.A",
  },
  "15357060": {
    code: "124",
    name: "BANCO WOORI BANK DO BRASIL S.A",
  },
  "15581638": {
    code: "149",
    name: "FACTA S.A. CFI",
  },
  "16501555": {
    code: "197",
    name: "STONE PAGAMENTOS S.A",
  },
  "16944141": {
    code: "142",
    name: "BROKER BRASIL CC LTDA",
  },
  "17184037": {
    code: "389",
    name: "BANCO MERCANTIL DO BRASIL S.A.",
  },
  "17298092": {
    code: "184",
    name: "BANCO ITAÚ BBA S.A",
  },
  "17351180": {
    code: "634",
    name: "BANCO TRIANGULO S.A (BANCO TRIÂNGULO)",
  },
  "17352220": {
    code: "545",
    name: "SENSO CCVM S.A",
  },
  "17453575": {
    code: "132",
    name: "ICBC DO BRASIL BM S.A",
  },
  "17772370": {
    code: "298",
    name: "VIPS CC LTDA",
  },
  "18236120": {
    code: "260",
    name: "NU PAGAMENTOS S.A (NUBANK)",
  },
  "18520834": {
    code: "129",
    name: "UBS BRASIL BI S.A",
  },
  "19307785": {
    code: "128",
    name: "MS BANK S.A BANCO DE CÂMBIO",
  },
  "20155248": {
    code: "194",
    name: "PARMETAL DTVM LTDA",
  },
  "22610500": {
    code: "310",
    name: "VORTX DTVM LTDA",
  },
  "22896431": {
    code: "380",
    name: "PicPay Servicos S.A.",
  },
  "23522214": {
    code: "163",
    name: "COMMERZBANK BRASIL S.A BANCO MÚLTIPLO",
  },
  "23862762": {
    code: "280",
    name: "AVISTA S.A",
  },
  "24074692": {
    code: "146",
    name: "GUITTA CC LTDA",
  },
  "26563270": {
    code: "279",
    name: "CCR DE PRIMAVERA DO LESTE",
  },
  "27098060": {
    code: "335",
    name: "Banco Digio S.A",
  },
  "27406222": {
    code: "182",
    name: "DACASA FINANCEIRA S/A",
  },
  "27652684": {
    code: "278",
    name: "GENIAL INVESTIMENTOS CVM S.A",
  },
  "27842177": {
    code: "271",
    name: "IB CCTVM LTDA",
  },
  "28127603": {
    code: "021",
    name: "BANCO BANESTES S.A",
  },
  "28195667": {
    code: "246",
    name: "BANCO ABC BRASIL S.A",
  },
  "28326000": {
    code: "336",
    name: "BANCO C6 S.A - C6 BANK",
  },
  "28650236": {
    code: "292",
    name: "BS2 DISTRIBUIDORA DE TÍTULOS E INVESTIMENTOS",
  },
  "29030467": {
    code: "751",
    name: "SCOTIABANK BRASIL",
  },
  "30306294": {
    code: "208",
    name: "BANCO BTG PACTUAL S.A",
  },
  "30723886": {
    code: "746",
    name: "BANCO MODAL S.A",
  },
  "31597552": {
    code: "241",
    name: "BANCO CLASSICO S.A",
  },
  "31880826": {
    code: "612",
    name: "BANCO GUANABARA S.A",
  },
  "31895683": {
    code: "604",
    name: "BANCO INDUSTRIAL DO BRASIL S.A",
  },
  "32062580": {
    code: "505",
    name: "BANCO CREDIT SUISSE (BRL) S.A",
  },
  "32648370": {
    code: "196",
    name: "BANCO FAIR CC S.A",
  },
  "33042151": {
    code: "300",
    name: "BANCO LA NACION ARGENTINA",
  },
  "33042953": {
    code: "477",
    name: "CITIBANK N.A",
  },
  "33132044": {
    code: "266",
    name: "BANCO CEDULA S.A",
  },
  "33147315": {
    code: "122",
    name: "BANCO BRADESCO BERJ S.A",
  },
  "33172537": {
    code: "376",
    name: "BANCO J.P. MORGAN S.A",
  },
  "33264668": {
    code: "348",
    name: "BANCO XP S/A",
  },
  "33466988": {
    code: "473",
    name: "BANCO CAIXA GERAL BRASIL S.A",
  },
  "33479023": {
    code: "745",
    name: "BANCO CITIBANK S.A",
  },
  "33603457": {
    code: "120",
    name: "BANCO RODOBENS S.A",
  },
  "33644196": {
    code: "265",
    name: "BANCO FATOR S.A",
  },
  "33657248": {
    code: "007",
    name: "BNDES (Banco Nacional do Desenvolvimento Social)",
  },
  "33775974": {
    code: "188",
    name: "ATIVA S.A INVESTIMENTOS",
  },
  "33862244": {
    code: "134",
    name: "BGC LIQUIDEZ DTVM LTDA",
  },
  "33870163": {
    code: "641",
    name: "BANCO ALVORADA S.A",
  },
  "33885724": {
    code: "029",
    name: "BANCO ITAÚ CONSIGNADO S.A",
  },
  "33923798": {
    code: "243",
    name: "BANCO MÁXIMA S.A",
  },
  "34111187": {
    code: "078",
    name: "HAITONG BI DO BRASIL S.A",
  },
  "36113876": {
    code: "111",
    name: "BANCO OLIVEIRA TRUST DTVM S.A",
  },
  "42272526": {
    code: "017",
    name: "BNY MELLON BANCO S.A",
  },
  "43180355": {
    code: "174",
    name: "PERNAMBUCANAS FINANC S.A",
  },
  "44189447": {
    code: "495",
    name: "LA PROVINCIA BUENOS AIRES BANCO",
  },
  "45246410": {
    code: "125",
    name: "BRASIL PLURAL S.A BANCO",
  },
  "46518205": {
    code: "488",
    name: "JPMORGAN CHASE BANK",
  },
  "48795256": {
    code: "065",
    name: "BANCO ANDBANK S.A",
  },
  "49336860": {
    code: "492",
    name: "ING BANK N.V",
  },
  "50579044": {
    code: "145",
    name: "LEVYCAM CCV LTDA",
  },
  "50585090": {
    code: "250",
    name: "BANCO BCV",
  },
  "51938876": {
    code: "494",
    name: "BANCO REP ORIENTAL URUGUAY",
  },
  "52937216": {
    code: "253",
    name: "BEXS CC S.A",
  },
  "53518684": {
    code: "269",
    name: "HSBC BANCO DE INVESTIMENTO",
  },
  "54403563": {
    code: "213",
    name: "BCO ARBI S.A",
  },
  "55230916": {
    code: "139",
    name: "INTESA SANPAOLO BRASIL S.A",
  },
  "57839805": {
    code: "018",
    name: "BANCO TRICURY S.A",
  },
  "58160789": {
    code: "422",
    name: "BANCO SAFRA S.A",
  },
  "58497702": {
    code: "630",
    name: "BANCO INTERCAP S.A",
  },
  "58616418": {
    code: "224",
    name: "BANCO FIBRA S.A",
  },
  "59118133": {
    code: "600",
    name: "BANCO LUSO BRASILEIRO S.A",
  },
  "59285411": {
    code: "623",
    name: "BANCO PAN",
  },
  "59438325": {
    code: "204",
    name: "BANCO BRADESCO CARTOES S.A",
  },
  "59588111": {
    code: "655",
    name: "NEON PAGAMENTOS S.A (OS MESMOS DADOS DO BANCO VOTORANTIM)",
  },
  "60394079": {
    code: "479",
    name: "BANCO ITAUBANK S.A",
  },
  "60498557": {
    code: "456",
    name: "BANCO MUFG BRASIL S.A",
  },
  "60518222": {
    code: "464",
    name: "BANCO SUMITOMO MITSUI BRASIL S.A",
  },
  "60701190": {
    code: "341",
    name: "ITAÚ UNIBANCO S.A",
  },
  "60746948": {
    code: "237",
    name: "NEXT BANK (UTILIZAR O MESMO CÓDIGO DO BRADESCO)",
  },
  "60850229": {
    code: "613",
    name: "OMNI BANCO S.A",
  },
  "60872504": {
    code: "652",
    name: "ITAÚ UNIBANCO HOLDING BM S.A",
  },
  "60889128": {
    code: "637",
    name: "BANCO SOFISA S.A (SOFISA DIRETO)",
  },
  "61024352": {
    code: "653",
    name: "BANCO INDUSVAL S.A",
  },
  "61033106": {
    code: "069",
    name: "BANCO CREFISA S.A",
  },
  "61088183": {
    code: "370",
    name: "BANCO MIZUHO S.A",
  },
  "61182408": {
    code: "249",
    name: "BANCO INVESTCRED UNIBANCO S.A",
  },
  "61186680": {
    code: "318",
    name: "BANCO BMG S.A",
  },
  "61348538": {
    code: "626",
    name: "BANCO FICSA S.A",
  },
  "61444949": {
    code: "270",
    name: "SAGITUR CC LTDA",
  },
  "61533584": {
    code: "366",
    name: "BANCO SOCIETE GENERALE BRASIL",
  },
  "61723847": {
    code: "113",
    name: "MAGLIANO S.A",
  },
  "61747085": {
    code: "131",
    name: "TULLETT PREBON BRASIL CVC LTDA",
  },
  "61809182": {
    code: "011",
    name: "C.SUISSE HEDGING-GRIFFO CV S.A (Credit Suisse)",
  },
  "61820817": {
    code: "611",
    name: "BANCO PAULISTA",
  },
  "62073200": {
    code: "755",
    name: "BOFA MERRILL LYNCH BM S.A",
  },
  "62109566": {
    code: "089",
    name: "CCR REG MOGIANA",
  },
  "62144175": {
    code: "643",
    name: "BANCO PINE S.A",
  },
  "62169875": {
    code: "140",
    name: "EASYNVEST - TÍTULO CV S.A",
  },
  "62232889": {
    code: "707",
    name: "BANCO DAYCOVAL S.A",
  },
  "62237649": {
    code: "288",
    name: "CAROL DTVM LTDA",
  },
  "62287735": {
    code: "101",
    name: "RENASCENCA DTVM LTDA",
  },
  "62331228": {
    code: "487",
    name: "DEUTSCHE BANK S.A BANCO ALEMÃO",
  },
  "62421979": {
    code: "233",
    name: "BANCO CIFRA",
  },
  "65913436": {
    code: "177",
    name: "GUIDE",
  },
  "68900810": {
    code: "633",
    name: "BANCO RENDIMENTO S.A",
  },
  "71027866": {
    code: "218",
    name: "BANCO BS2 S.A",
  },
  "71371686": {
    code: "169",
    name: "BANCO OLÉ BONSUCESSO CONSIGNADO S.A",
  },
  "71590442": {
    code: "293",
    name: "LASTRO RDV DTVM LTDA",
  },
  "71677850": {
    code: "285",
    name: "FRENTE CC LTDA",
  },
  "73622748": {
    code: "080",
    name: "B&T CC LTDA",
  },
  "74828799": {
    code: "753",
    name: "NOVO BANCO CONTINENTAL S.A BM",
  },
  "75647891": {
    code: "222",
    name: "BANCO CRÉDIT AGRICOLE BR S.A",
  },
  "76543115": {
    code: "754",
    name: "BANCO SISTEMA",
  },
  "78157146": {
    code: "098",
    name: "CREDIALIANÇA CCR",
  },
  "78626983": {
    code: "610",
    name: "BANCO VR S.A",
  },
  "78632767": {
    code: "712",
    name: "BANCO OURINVEST S.A",
  },
  "81723108": {
    code: "010",
    name: "CREDICOAMO",
  },
  "89960090": {
    code: "283",
    name: "RB CAPITAL INVESTIMENTOS DTVM LTDA",
  },
  "90400888": {
    code: "033",
    name: "BANCO SANTANDER BRASIL S.A",
  },
  "91884981": {
    code: "217",
    name: "BANCO JOHN DEERE S.A",
  },
  "92702067": {
    code: "041",
    name: "BANRISUL – BANCO DO ESTADO DO RIO GRANDE DO SUL S.A",
  },
  "92856905": {
    code: "117",
    name: "ADVANCED CC LTDA",
  },
  "92874270": {
    code: "654",
    name: "BANCO DIGIMAIS S.A",
  },
  "92894922": {
    code: "212",
    name: "BANCO ORIGINAL S.A",
  },
  "00000000": {
    code: "001",
    name: "BANCO DO BRASIL S.A (BB)",
  },
  "08561701": {
    code: "290",
    name: "Pagseguro Internet S.A (PagBank)",
  },
  "00416968": {
    code: "077",
    name: "BANCO INTER S.A",
  },
  "00360305": {
    code: "104",
    name: "CAIXA ECONÔMICA FEDERAL (CEF)",
  },
  "02038232": {
    code: "756",
    name: "BANCOOB (BANCO COOPERATIVO DO BRASIL)",
  },
  "00000208": {
    code: "070",
    name: "BANCO DE BRASÍLIA (BRB)",
  },
  "00315557": {
    code: "136",
    name: "UNICRED COOPERATIVA",
  },
  "00517645": {
    code: "741",
    name: "BANCO RIBEIRÃO PRETO",
  },
  "00558456": {
    code: "739",
    name: "BANCO CETELEM S.A",
  },
  "00795423": {
    code: "743",
    name: "BANCO SEMEAR S.A",
  },
  "00806535": {
    code: "100",
    name: "PLANNER CORRETORA DE VALORES S.A",
  },
  "00997185": {
    code: "096",
    name: "BANCO B3 S.A",
  },
  "01023570": {
    code: "747",
    name: "Banco RABOBANK INTERNACIONAL DO BRASIL S.A",
  },
  "01181521": {
    code: "748",
    name: "SICREDI S.A",
  },
  "01522368": {
    code: "752",
    name: "BNP PARIBAS BRASIL S.A",
  },
  "01634601": {
    code: "091",
    name: "UNICRED CENTRAL RS",
  },
  "01701201": {
    code: "399",
    name: "KIRTON BANK",
  },
  "01800019": {
    code: "108",
    name: "PORTOCRED S.A",
  },
  "02318507": {
    code: "757",
    name: "BANCO KEB HANA DO BRASIL S.A",
  },
  "02332886": {
    code: "102",
    name: "XP INVESTIMENTOS S.A",
  },
  "09554480": {
    code: "340",
    name: "SUPER PAGAMENTOS S/A (SUPERDITAL)",
  },
  "09089356": {
    code: "364",
    name: "GERENCIANET PAGAMENTOS DO BRASIL",
  },
  "02398976": {
    code: "084",
    name: "UNIPRIME NORTE DO PARANÁ",
  },
  "02685483": {
    code: "180",
    name: "CM CAPITAL MARKETS CCTVM LTDA",
  },
  "02801938": {
    code: "066",
    name: "BANCO MORGAN STANLEY S.A",
  },
  "02819125": {
    code: "015",
    name: "UBS BRASIL CCTVM S.A",
  },
  "02992317": {
    code: "143",
    name: "TREVISO CC S.A",
  },
  "03012230": {
    code: "062",
    name: "HIPERCARD BM S.A",
  },
  "03017677": {
    code: "074",
    name: "BCO. J.SAFRA S.A",
  },
  "03046391": {
    code: "099",
    name: "UNIPRIME CENTRAL CCC LTDA",
  },
  "03323840": {
    code: "025",
    name: "BANCO ALFA S.A.",
  },
  "03532415": {
    code: "075",
    name: "BCO ABN AMRO S.A",
  },
  "03609817": {
    code: "040",
    name: "BANCO CARGILL S.A",
  },
  "03973814": {
    code: "190",
    name: "SERVICOOP",
  },
  "04184779": {
    code: "063",
    name: "BANCO BRADESCARD",
  },
  "04257795": {
    code: "191",
    name: "NOVA FUTURA CTVM LTDA",
  },
  "04332281": {
    code: "064",
    name: "GOLDMAN SACHS DO BRASIL BM S.A",
  },
  "04632856": {
    code: "097",
    name: "CCC NOROESTE BRASILEIRO LTDA",
  },
  "04715685": {
    code: "016",
    name: "CCM DESP TRÂNS SC E RS",
  },
  "04866275": {
    code: "012",
    name: "BANCO INBURSA",
  },
  "04902979": {
    code: "003",
    name: "BANCO DA AMAZONIA S.A",
  },
  "04913129": {
    code: "060",
    name: "CONFIDENCE CC S.A",
  },
  "04913711": {
    code: "037",
    name: "BANCO DO ESTADO DO PARÁ S.A",
  },
  "05442029": {
    code: "159",
    name: "CASA CREDITO S.A",
  },
  "05452073": {
    code: "172",
    name: "ALBATROSS CCV S.A",
  },
  "05463212": {
    code: "085",
    name: "COOP CENTRAL AILOS",
  },
  "05790149": {
    code: "114",
    name: "CENTRAL COOPERATIVA DE CRÉDITO NO ESTADO DO ESPÍRITO SANTO",
  },
  "06271464": {
    code: "036",
    name: "BANCO BBI S.A",
  },
  "07207996": {
    code: "394",
    name: "BANCO BRADESCO FINANCIAMENTOS S.A",
  },
  "07237373": {
    code: "004",
    name: "BANCO DO NORDESTE DO BRASIL S.A.",
  },
  "07450604": {
    code: "320",
    name: "BANCO CCB BRASIL S.A",
  },
  "07512441": {
    code: "189",
    name: "HS FINANCEIRA",
  },
  "07652226": {
    code: "105",
    name: "LECCA CFI S.A",
  },
  "07656500": {
    code: "076",
    name: "BANCO KDB BRASIL S.A.",
  },
  "07679404": {
    code: "082",
    name: "BANCO TOPÁZIO S.A",
  },
  "07853842": {
    code: "286",
    name: "CCR DE OURO",
  },
  "07945233": {
    code: "093",
    name: "PÓLOCRED SCMEPP LTDA",
  },
  "08253539": {
    code: "273",
    name: "CCR DE SÃO MIGUEL DO OESTE",
  },
  "09105360": {
    code: "157",
    name: "ICAP DO BRASIL CTVM LTDA",
  },
  "09210106": {
    code: "183",
    name: "SOCRED S.A",
  },
  "09274232": {
    code: "014",
    name: "NATIXIS BRASIL S.A",
  },
  "09313766": {
    code: "130",
    name: "CARUANA SCFI",
  },
  "09512542": {
    code: "127",
    name: "CODEPE CVC S.A",
  },
  "09516419": {
    code: "079",
    name: "BANCO ORIGINAL DO AGRONEGÓCIO S.A",
  },
} satisfies TPayRetailersBankModel;

type TPayRetailersBank = keyof typeof payRetailersBankModel

const payRetailersBankOptions =
  getSelectOptions(keys(payRetailersBankModel));

const payRetailersBankOption = (option: ISelectOption<TPayRetailersBank>) => payRetailersBankModel[option.value].name;

export type { TPayRetailersBank };
export { payRetailersBankModel, payRetailersBankOptions, payRetailersBankOption };
