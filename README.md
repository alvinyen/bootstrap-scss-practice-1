# bootstrap-scss-practice-1

## 『 專案說明 』
- 練習scss、pug、bootstrap的整合，並應用gulp作為bundling tool

<hr>
<hr>

## 『 dubug 』
```css=
    section, header {
        display: none;
    }
    section.xxx {
        display: block;
    }
```

<hr>
<hr>

## 『 重點及實作過程 』
### [ header ]
- header、section for seo
- 容器
    - jumbotron
        - 預設樣式上下padding不同
        - 使用xxx.jumbotron來選擇，提高優先層級
    - container：置中
    - container-fluid：佈滿、撐開
- 置中
    - text-center // 懶寫css好用
- padding型技巧
    - 向內padding
    - 向外padding
- 圖片
    - background-size： cover;
    - background-image： center center;

<hr>

### [ section.intro ] 
- bootstrap網格結構
    - container/container-fluid>row>col
    - 大標小標、3格圖片分別各為1個row
- 大標小標部分的字級等樣式因為希望在之後的section重用，因此獨立個class來完成樣式的設定
    - pug部分
    ```pug=
        .row
            .col-md-12
                h2.section-heading xxxx
                h3.section-subheading.text-muted xxxx
    ```
    - 字型大小差距在2倍左右的話會有標題非常強烈的感覺
    ```css=
        section {
            text-align: center;
            padding: 80px 0px;
            .section-heading {
                font-size: 36px;
                margin-top: 0px;
            }
            .section-subheading {
                font-size: 16px;
            }
        }
    ```
- 圖片區塊部分
    - pug部分
        ```pug=
        .row
            .col-md-4
                img(src="...", alt="")
                h4 xxxx
                h6.text-muted xxxx
            .col-md-4
            .col-md-4
        ```
    - scss部分
        ```css=
            .col-sea {
               padding: 90px;
               img {
                   width: 100%; // try
                   border-radius: 50%;
               }
            }
        ```

<hr>

### [ section.story ]
- 關於h1~h6的層級
    - 如下，前面已經用過h2、h3，在接下來為了避免h1到h6的層級錯亂，在需要h2和h3之類的字級的地方可以使用一般的區塊+boorstrap內建的.h1到.h6 class來達成需求
        - ![](https://i.imgur.com/6YdkaQq.png)
- section和section.xxx
    - section
        - css的共同設定
    - section.xxx
        - csss的區塊特化設定
- css部分
    ```css=
    section.story {
        background-color: #eee;
        .icon-sea {
            width: 80px;
            margin-bottom: 20px;
        }
        .col-md-6 {
            padding: 20px; // 希望左右區塊之間不要那麼擠
        }
    }
    ```

<hr>

### [ section.pictures ]
- 使用.text-panel來group文字區塊 (h2, h3 ....etc.)
    - 讓副標題原本不要那麼明顯
        - opacity: 0.6;
- 背景圖片重複問題
- 透過filter來讓區塊變暗 (滑鼠移入時顏色變深)，但區塊變暗的同時，文字也會變暗
    - 一般做法
        - `&:hover { filter: brightness(0.5); }`
        - 慢慢的變： `transition-duration: 0.5s;`
        - trouble：filter會針對整個區塊，因此連文字也會一起變深
    - solution
        - 用個元素將背景圖片單獨裝起來 -> &::before、偽元素
        - 將&::before / pseudo element / 偽元素 當作一般的div元素來使用必須經過3道手續
            - 1. content: '';
            - 2. display: block; // 正常div的block
            - 3. 撐出大小
                - width: 100%;
                - height: 100%;
            - (4. 其他)
                - 背景圖片 background-image: url(...);
                - 絕對定位 // 使圖片從左上開始顯示
                - backgound-position: center center; // 使漸變的原點從中央開始，而非左上角
                - 針對before、欲漸變的元素標的設定transition-duration
        - :hover
            - 針對hover之後的before去調整background-size (使整體元素視覺放大、縮小)