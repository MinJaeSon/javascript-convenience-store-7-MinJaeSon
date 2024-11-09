# 구현할 기능 정리 및 설계

## 1. Model

상품 정보, 재고 관리, 할인 정책 등을 포함하여 시스템의 데이터와 비즈니스 로직을 담당한다.

### Product

상품 정보와 해당 상품의 프로모션 정보를 담은 객체 = 상품 하나

### Promotion

프로모션 정보를 담은 객체 

### ProductStorage

전체 상품 정보를 담고 재고를 관리하는 객체 = 현재 보유하고 있는 상품 정보

- [ ] 목록에서 구매할 상품들을 찾아 상품 정보를 반환하는 기능

### Discount

전체 할인 정보를 관리하는 객체

- [ ] 행사 할인 금액과 멤버십 할인 금액 반환

### PromotionDiscount

프로모션 할인을 처리하는 객체

### MembershipDiscount

멤버십 할인을 처리하는 객체

### ProductPurchase

상품 구매를 관리하는 객체

### Receipt

영수증 객체

## 2. View

사용자와의 상호작용을 담당하며, 입력을 받고 결과를 출력하는 역할을 한다.

### InputView

사용자로부터 입력을 받아 필요한 정보를 전달하는 역할을 한다.

- [ ] 구매할 상품명, 수량 입력
- [ ] 멤버십 할인 여부 입력
- [ ] 추가 구매 여부 입력

### OutputView

사용자에게 시스템 메시지와 영수증을 출력하는 역할을 한다.

- [ ] 현재 보유하고 있는 상품 정보 출력
  - 상품 재고가 없는 경우 `재고 없음`으로 출력
- [ ] 프로모션 적용이 가능한 상품에 대해 고객이 해당 수량만큼 가져오지 않았을 경우, 혜택에 대한 안내 메시지 출력
- [ ] 프로모션 재고가 부족하여 일부 수량을 프로모션 혜택 없이 결제해야 하는 경우, 일부 수량에 대해 정가로 결제할지 여부에 대한 안내 메시지 출력
- [ ] 영수증 출력
  - 구매 상품 내역 : 상품명, 수량, 금액
  - 증정 상품 내역 : 상품명 수량
  - 금액 정보 : 총 구매액, 프로모션 할인 금액, 멤버십 할인 금액, 최종 결제액

## 3. Controller

Model과 View를 연결하여, 입력을 받아 Model에서 처리하고 결과를 View에 전달하는 역할을 한다.

- [ ] 주어진 데이터를 파싱하여 객체로 생성
- [ ] 사용자 입력 처리 및 검증
- [ ] 사용자의 입력에 따라 적절한 객체를 생성하고, Model과 View 간의 상호작용을 관리
- [ ] 주문 및 재고 관리
- [ ] 프로모션 및 멤버십 할인 적용
- [ ] 영수증 생성 및 출력 관리
- [ ] 추가 구매 및 프로그램 흐름 제어

## 4. Validator

사용자의 입력에 대해 유효성 검사 및 예외 상황을 확인하는 역할을 한다.

- [ ] 구매할 상품명 및 수량에 대한 입력 형식 검사 <br/>
  - 형식이 올바르지 않은 경우) `[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.`
- [ ] 입력한 상품이 존재하는 상품인지 확인 <br/>
  - 존재하지 않는 경우) `[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.`
- [ ] 구매 수량만큼 재고가 남아있는지 확인 <br/>
  - 재고가 부족한 경우) `[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.`
- [ ] 기타 잘못된 입력에 대한 예외 처리 <br/>
  - ex. Y/N 형식의 입력에 대한 입력이 올바르지 않은 경우
  - `[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.`

## 5. Utils

여러 프로젝트 파일에서 공통적으로 사용할 수 있는 유틸 함수들을 정의하고 관리하는 디렉토리

- [ ] 각 상품에 대한 Product 객체를 생성할 수 있도록 주어진 `products.md`와 `promotions.md`를 파싱하여 필요한 값들을 반환하는 함수
- [ ] 상품 금액, 총 결제 금액 등을 계산하는 객체
  - [ ] 전체 금액에서 할인 금액을 빼고 최종적으로 결제해야 하는 금액을 계산하는 함수
  - [ ] 구매한 각 상품에 대해 가격과 수량을 전달받아 금액을 계산하는 함수
  - [ ] 구매한 전체 상품의 금액을 모두 합한 전체 금액을 계산하는 함수
