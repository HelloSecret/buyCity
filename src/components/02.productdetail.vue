<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <!--images.normal_size.length 有数据才渲染
                                  :base-images="images" 传递图片数据
                                  :base-zoomer-options 传递放大镜参数   -->
                                <ProductZoomer v-if="images.normal_size.length!=0" :base-images="images"
                                    :base-zoomer-options="zoomerOptions"></ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number size="mini" v-model="buyCount" @change="buyCountChange"
                                                    :min="0" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <!-- <span class="demo-affix">固定在最顶部</span> -->
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="showDiscuss=false" :class="{selected:showDiscuss==false}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="showDiscuss=true" :class="{selected:showDiscuss==true}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div class="tab-content entry" v-show="showDiscuss==false" v-html="goodsinfo.content">
                            </div>
                            <div class="tab-content" v-show="showDiscuss">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" v-model.trim="commentInfo" name="txtContent"
                                                    sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit"
                                                    @click="submitCommit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <!-- 判断评论数据里面是否有值  没值显示抢沙发 -->
                                        <p v-show="comments.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | filterDate}}</span>
                                                    <Rate allow-half v-model="valueHalf" />
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <template>
                                            <Page :total="totalCount" :page-size='5' show-elevator show-sizer placement="top"
                                                :page-size-opts="[5,10,15,20]" @on-page-size-change="pageSizeChange"
                                                @on-change="pageChange" />
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class="">{{item.title}}</a> -->
                                            <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                                            <span>{{item.addtime | filterDate}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Back-Top></Back-Top>
        <!-- 移动的小图片 -->
        <img v-if="imglist.length!=0" class="moveImg" :src="imglist[0].original_path" alt="">
    </div>
</template>
<script>
    // import axios from "axios";
    import $ from "jquery";

    export default {
        name: "detail",
        data: function () {
            return {
                productId: undefined, // id
                goodsinfo: {},
                hotgoodslist: [],
                imglist: [],
                buyCount: 0,
                showDiscuss: false,
                // 放大镜插件所需的数据
                zoomerOptions: {
                    'zoomFactor': 3, //放大倍数
                    'pane': 'container-round', // 放大的形式container 方形  container-round圆形
                    'hoverDelay': 300, // 放大镜延迟时间
                    'namespace': 'container-zoomer', //为缩放器组件添加命名空间，在页面上有多个缩放器
                    'move_by_click': true, // 点击切换
                    'scroll_items': 4, //轮播小图显示个数
                    'choosed_thumb_border_color': "#ff3d00" // 边框颜色
                },
                // 放大镜插件所需数据
                images: {
                    normal_size: []
                },
                pageNum: 1, //默认显示第一页
                pageSize: 5, //默认每页显示多少条
                comments: [], // 通过ajax 拿到关于评论的所有数据  默认为空
                totalCount: 0, //总条数
                commentInfo: '', //双向绑定 评论内容
                valueHalf: 2.5 //评星
            };
        },
        methods: {
            // 这个是计数器的方法
            buyCountChange(value) {
                // console.log(value);
            },
            // 这个是渲染商品的方法（左侧列表 商品详情图片 放大镜图片）
            getProductDetail() {
                // 根据vue内置的方法 拿到get请求的id
                this.productId = this.$route.params.id;
                this.$axios.get(
                        `site/goods/getgoodsinfo/${this.productId}`
                    )
                    .then(response => {
                        //    console.log(response)
                        this.goodsinfo = response.data.message.goodsinfo;
                        this.hotgoodslist = response.data.message.hotgoodslist;
                        this.imglist = response.data.message.imglist;
                        // 放大镜插件需要的图片数据格式 
                        //             ' images '： {
                        //    ' thumbs '： [
                        //     {
                        //       ' id '： 1，
                        //        ' url '： ' http：//yoohooworld.com/images/vue-product-zoomer/images/thumbs/1.jpeg '
                        //     }，
                        // 处理 放大镜数据 转换成插件需要的数据格式
                        let temArr = [];
                        // 循环处理数据
                        this.imglist.forEach((v, i) => {
                            temArr.push({
                                id: v.id,
                                url: v.original_path
                            })
                        })
                        // 临时数组
                        this.images.normal_size = temArr
                    });
            },
            // 拿到评论数据的方法
            getComments() {
                this.$axios.get(
                        `site/comment/getbypage/goods/${this.productId}?pageIndex=${this.pageNum}&pageSize=${this.pageSize}`
                    )
                    .then(res => {
                        //   console.log(res);
                        // 获取评论所有数据
                        this.comments = res.data.message;
                        // 获取评论总条数
                        this.totalCount = res.data.totalcount
                    })
            },
            // 每页的显示数量 监听每页容量改变
            pageSizeChange(size) {
                // console.log(size);
                this.pageSize = size
                // 除了第一页 其他页面改变页容量之后都会自动渲染 所以判断是否为第一页 是第一页 则重新拿数据
                if (this.pageNum == 1) {
                    this.getComments();
                }
            },
            // 点击的是第几页 监听改变页数
            pageChange(page) {
                // console.log(page);
                this.pageNum = page;
                this.getComments();
            },
            submitCommit() {
                // 评论非空判断
                if (this.commentInfo == '') {
                    // iview 错误提示
                    this.$Message.error('请疯狂输出');
                    return;
                }
                // 发请求传递评论
                this.$axios.post(`site/validate/comment/post/goods/${this.productId}`, {
                    commenttxt: this.commentInfo
                }).then(res => {
                    // console.log(res);
                    // if(res.data.message)
                    // 上传评论之后给与成功提示
                    this.$Message.success(res.data.message);
                    // 清空输入框内容
                    this.commentInfo = '';
                    // 刷新评论数据 渲染《
                    this.getComments();
                })
            },
            // 加入购物车的逻辑
            // 使用jq来实现
            cartAdd() {
                if (this.buyCount == 0) {
                    this.$Message.error("好歹买点东西吧，宝贝！");
                    return;
                }
                // 获取加入购物车位置
                let cartOffset = $('.add').offset();
                // console.log(cartOffset);
                // 获取购物车位置
                let targetOffset = $('.icon-cart').offset();
                // console.log(targetOffset);
                // 使用动画的方式 移动图片
                // 移动到按钮位置 显示出来 动画移动到目标位置
                $(".moveImg")
                    .stop()
                    .show()
                    .addClass("move")
                    .css(cartOffset)
                    .animate(targetOffset, 1000, function () {
                        $(this)
                            .hide()
                            .removeClass("move");
                    });
                // 动画完结以后
                // 	隐藏图片

                // 	增加购物车中的显示内容
                //    this.$store.commit('increment',50)
                // 调用增加商品的方法 需要商品的id  还有商品数量
                this.$store.commit("addGoods", {
                    goodId: this.productId,
                    goodNum: this.buyCount,
                });
            }
        },
        created() {
            // 调用渲染页面方法
            this.getProductDetail();
            // 调用分页的方法
            this.getComments();
        },
        watch: {
            // 监听$route的改变 它的改变 就是表示id在变化
            $route: function (val, oldval) {
                //    console.log(val)
                // 如果改变 拿到id 根据id重新渲染页面
                // 因为放大镜插件不会根据id重新渲染 所以每次改变把图片数据清空 配合 V-if 强制让其重新渲染
                this.images.normal_size = [];
                // 调用渲染页面方法
                this.getProductDetail();
                // 调用分页的方法
                this.getComments();
                // 商品变动后商品数量清0
                this.buyCount = 0;
            }
        }
    };
</script>

<style lang="less">
    .tab-content img {
        width: 100%;
        display: block;
    }

    /* 放大镜相关样式 */

    .pic-box {
        width: 395px;
    }

    .pic-box {
        width: 395px;

        .control-box .thumb-list {
            display: flex;
            justify-content: center;

            img {
                width: 80px;
                height: 80px;
                margin: 2px;
            }
        }

        .control {
            //   text-align:center;
            display: flex; // 主轴
            justify-content: center; // 纵轴 副轴 侧轴
            align-items: center;
        }
    }

    // 移动图片的样式
    // 移动图片的样式
    .moveImg {
        position: absolute;
        width: 50px;
        //   display: none;
        // top:0;
        // left:0;
    }

    .moveImg.move {
        transition: transform 1s, opacity 1s;
        opacity: 0.5;
        transform: scale(0.2) rotate(360deg);
    }
</style>