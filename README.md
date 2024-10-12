フロントエンド検証用

トピック

## tailwind調査

予め用意されたクラスを使用していい感じにデザインを作成してくれる。  
導入するならtailwind用のprettierもあるので合わせてインストールしておきたい。
prettier-plugin-tailwindcss

prettier-plugin-tailwindcssセットアップ

```
install -D prettier prettier-plugin-tailwindcss
```

ルートディレクトリに.prettierrcを作成して下記を配置

```
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

.prettierignoreをルートディレクトリに作成してprettierのフォーマットを無視したいファイルを作成する。

```
node_modules
build
.next
```

下記で全てのファイルにprettierを設定することもできる。

```
prettier --write .
```

なのでpackage.jsonに下記のように追加すると便利かも
{
"scripts": {
"format": "prettier --write ."
}
}


pre-commitを使うとgit commitするときに自動整形してくれる。
```
install --save-dev prettier lint-staged husky
```

huskyインストール、セットアップ
```
install husky --save-dev
pnpm pkg set scripts.prepare="husky"
pnpm run prepare
```

pre-commitフックの追加、.husky/_/pre-commitファイルに下記を追加。
```
#!/usr/bin/env sh
. "$(dirname "$0")/h"

pnpm lint-staged
```

lint-stagedの設定、ルートディレクりに.lintstagedrc.jsを作成して下記を追加。
```
module.exports = {
  "*.{js,jsx,ts,tsx,css,md,html,json}": "prettier --write",
}
```

gitのフックには下記アクションがあり、  
pre-commit: コミットをする前に実行されるスクリプト。コードの整形や lint などに使われます。  
commit-msg: コミットメッセージのチェックに使用され、フォーマットが正しいかどうかなどを検証します。  
pre-push: リモートにプッシュする前に実行されるスクリプト。テストやビルドの成功を確認するのに使用されます。  

pre-commitでprettierを実行したり、  
pre-pushでビルドが通るかチェックしてからpushしたりと調節ができる。


## reactヘッドレスUIライブラリを調査

CSSを独自に当てられる。CSS資産が多い場合は選択肢になってくる。

- RadixUI
- Headless UI
- React Aria

githubスター的にはRadixUIとHeadless UIが大手
個人的にはReact Ariaがadobe製で好きなので推していきたい。

## reactUIライブラリを調査

最初からCSSが入っているライブラリもある。
デザインの開発工数が取れないなら選択肢に入ってくる。
依存性があるので、大規模、長期運用を想定するならヘッドレスUI + CSSライブラリの方がいいかも

- Material-UI（MUI）  
  https://mui.com/material-ui/getting-started/templates/dashboard/
  すごく好き
- Ant Design（AntD）
  https://preview.pro.ant.design/dashboard/analysis MUIの方が好きかも
- React Bootstrap
- Chakra UI  
  MUIを筆頭の他のライブラリと比べるとシンプルな設計、実装が可能そう。  
  Chakra UIはCSS-in-JSを使用しているため、実行時のパフォーマンスが他の手法を用いたライブラリと比べてやや劣る可能性があります。そのため、主に小規模から中規模のアプリケーション向けに適しています  
  https://v2.chakra-ui.com/getting-started/comparison#the-runtime-trade-off-%EF%B8%8F

- Next UI

## React Aria

ヘッドレスコンポーネント。スタイルを持たないが、機能とロジックのみを提供する。
CSSの部分を分離できるので拡張性が高いが、車輪の再発明を極力抑えることもできる。

必要なパッケージをインストール

```
pnpm install @react-aria/button
```

ariaはコンポジション設計となっている。  
コンポジションとは：
コンポジションは、小さな独立したコンポーネントを組み合わせて、より大きな複雑なコンポーネントや機能を構築する設計手法です。  
この方法では、各コンポーネントは特定の責任を持ち、それらを組み合わせることで柔軟性と再利用性の高いシステムを作ることができます。

```tsx
import React from "react";
import { useButton } from "@react-aria/button";
import { useToggleState } from "@react-stately/toggle";

// 基本的なボタンコンポーネント
function Button(props) {
  let ref = React.useRef();
  let { buttonProps } = useButton(props, ref);
  return (
    <button {...buttonProps} ref={ref}>
      {props.children}
    </button>
  );
}

// トグル機能を持つボタンコンポーネント
function ToggleButton(props) {
  let state = useToggleState(props);
  return (
    <Button {...props} isPressed={state.isSelected} onPress={state.toggle}>
      {typeof props.children === "function"
        ? props.children(state.isSelected)
        : props.children}
    </Button>
  );
}

// 使用例
function App() {
  return (
    <ToggleButton>{(isSelected) => (isSelected ? "ON" : "OFF")}</ToggleButton>
  );
}
```

他にどんな設計があるか？

1. 継承ベースの設計：

   - クラスベースのコンポーネントで、親クラスの機能を継承して拡張します。
   - 例：`class ToggleButton extends Button { ... }`
   - 欠点：柔軟性が低く、深い継承階層が生まれやすい。

2. HOC（Higher-Order Components）：

   - コンポーネントを受け取り、新しい機能を追加したコンポーネントを返す関数。
   - 例：`const withToggle = (WrappedComponent) => { ... }`
   - 欠点：複数のHOCを組み合わせると、デバッグが難しくなる場合がある。

3. Render Props：

   - 関数をプロップとして渡し、その関数内でコンポーネントをレンダリングする方法。
   - 例：`<Toggle>{(isOn) => <Button isPressed={isOn} />}</Toggle>`
   - 欠点：ネストが深くなると可読性が低下する場合がある。

4. モノリシックな設計：
   - 1つの大きなコンポーネント内ですべての機能を実装する。
   - 例：`<ComplexButton with="all" features="included" />`
   - 欠点：再利用性が低く、保守が難しくなる。

こちらの記事が参考になる。
https://azukiazusa.dev/blog/react-aria-accessible-component/

## コンポーネント設計

## storybook
