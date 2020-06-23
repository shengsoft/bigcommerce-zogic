import $ from 'jquery';
import 'jquery-zoom';
import utils from '@bigcommerce/stencil-utils';
import ProductDetails from '../common/product-details';

export default function(context, $gallery){
	var container_div = $gallery.attr('class');
		container_div = container_div.replace('modal-body', '').replace(' ', '');
	vGallery($gallery);

	utils.hooks.on('product-option-change', (event, changedOption) => {
		productOptionsChanged(event, changedOption);
	});

	function productOptionsChanged(event, changedOption) {
       $( document ).ajaxComplete(function( event, xhr, settings ) {
		  	var res = JSON.parse(xhr.responseText);
		  	if(res.data.image)
		  	{
		  		const zoomImageUrl = utils.tools.image.getSrc(
	                res.data.image.data,
	                context.themeSettings.zoom_size
	            );
		  		var s="<img src='"+zoomImageUrl+"'>";
	            $('.vgallery_normal .vgallery_repalce').html(s).addClass('view').trigger('zoom.destroy').zoom({ touch: false, onZoomIn: true, onZoomOut: true });
		  	}
		  	else{
		  		$('.vgallery_normal .vgallery_repalce').html('').removeClass('view');
		  	}
		});
    }

	function vGallery($gallery) {
        var b=new haloGallery();

        for (var i = 0; i < ThumbURLs.length; i++) {
            b.add({'thumbnail': ThumbURLs[i],'url': ZoomImageURLs[i]});
        }

        var bc=function(s) {
            return "<div class='athum'>"+s.u_thumbnail+"</div>";
        };

        for (var v = 0; v < YoutubeIds.length; v++) {

            b.add({'thumbnail':'https://cdn11.bigcommerce.com/s-8mji1/product_images/uploaded_images/videothumbnail.png','content':"<iframe class='youtube-iframe' width='100%' height='100%' src='https://www.youtube.com/embed/"+YoutubeIds[v]+"?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"});
        }

        b.view({'get':'.'+container_div+' .bdiv','f_view_arrow':bc,'per':4/3,auto:false});
        b.addscrollRun({'get':'.'+container_div+' .bdiv>.vgallery>.ctr_arrows','ul':'>.arrows','li':'>span','per':10/2,current:0});
        b.addPopview();
    }

	function haloGallery()
	{

	    this.data=[];this.round=[];this.transfer={};this.callname={};this.callvariable={};
	    this.add=function(ops)
	    {
	        if(ops.url || ops.content)
	        {
	            var dfs={'thumbnail':'','url':'','type':'','content':'','w':0,'height':0,'loaded':false};
	            ops=$.extend({},dfs,ops);

	            if(ops.content)ops.u_content=ops.content;
	            else
	            {
	                if(!ops.type)ops.type='image';
	                if(ops.type='image')
	                {
	                    ops.u_content="<img src='"+ops.url+"'>";
	                }
	            }

                if(!ops.thumbnail)ops.thumbnail=ops.url;
                if(ops.thumbnail)
                    ops.u_thumbnail="<img src='"+ops.thumbnail+"'>";
                else ops.u_thumbnail=ops.u_content;
                if(!ops.u_thumbnail)ops.u_thumbnail="<div class='thumbnail'></div>";

	        	this.data.push(ops);
	        }
	    }
	    this.reround=function()
	    {
	        this.round=[];
	        var pp;
			var c=this.data.length;

	        for(var i=0;i<c;i++)
	        {
	            pp={'next':i+1,'prev':i-1,'current':i};
	            this.round[i]=pp;
	            this.data[i].stt=i;
			}

			if (c > 0) {
				this.round[0].prev=c-1;
				this.round[c-1].next=0;
			}
	    }
	    this.addcall=function(name,func)
	    {
	        var b=this.callname[name];
	        if(!b)this.callname[name]=[func];
	        else this.callname[name].push(func);
	    }
	    this.call=function(name,s)
	    {
	        var b=this.callname[name];
	        if(b)
	        {
	            for(var i=0;i<b.length;i++)b[i](s);
	        }
	    }
	    this.smartsize=function(ops)
	    {
	        var dfs={'w':420,'h':420,'min_w':0,'min_h':0,'width':0,'height':0};
	        ops=$.extend({},dfs,ops);
	        var rt={'status':false,'width':0,'height':0};
	        if(ops.height && ops.h)
	        {
	            var per=[ops.w/ops.h,ops.width/ops.height];
	            if(per[0]==per[1])
	            {
	                rt={width:ops.w,height:ops.h};
	            }
	            else
	            {
	                if(per[0]>per[1])
	                {
	                    rt={width:''}
	                }
	                else
	                {

	                }
	            }
	            rt.status=true;
	        }

	    }
	    this.aview=function(num)
	    {
	    	var s=this.data[num].load_content;
	    	if(!s) s=this.data[num].content
	    	return s;
	    }
	    this.view=function(ops)
	    {
	        var dfs={'auto':true};ops=$.extend({},dfs,ops);
	        var vctr=function(s)
	        {
	            return "<span class='ctr ctr_"+s+"'></span>";
	        }
	        var crow=function(s)
	        {
	            return "<span class='arrow arrow_"+s.stt+"' data='"+s.stt+"'></span>";
	        }
	        var dfs={'type':'normal','get':'','f_view_arrow':crow,'f_view_ctr':vctr,'time':4000,'per':0};
	        ops=$.extend({},dfs,ops);
	        var ok=true;
	        if(!ops.get)ok=false;
	        if(ok)
	        {
	        this.reround();
	        this.transfer=ops;
	        this.view_style_normal();
	        }

	    }
	    this.view_style_normal=function(ops)
	    {
	        var cthis=this;
	        ops=$.extend({},{},this.transfer);
	        ops.list=this.data;
	        ops.s=ops.list.length;
	        if(!ops.current)ops.current=0;
	        ops.cur=parseInt(ops.current);

	        view();
	        function aview(op)
	        {
	            return '<li>'+op.u_content+'</li>';
	        }
	        function view()
	        {
	            var s='',c_arrow='',c_ctr=ops.f_view_ctr('next')+ops.f_view_ctr('preview');
	            for(var i=0;i<ops.s;i++)
	            {
	                s+=aview(ops.list[i]);
	                var cc=$.extend({},{'stt':i},ops.list[i]);
	                c_arrow+="<span class='arrow'>"+ops.f_view_arrow(cc)+"</span>";
	            }
	            c_arrow="<div class='ctr_arrows'><div class='arrows'>"+c_arrow+"</div></div>";
	            c_ctr="<div class='controls'>"+c_ctr+"</div>";
	            s="<div class='vgallery vgallery_normal'><ul>"+s+"<li class='vgallery_repalce'></li>"+c_ctr+"</ul>"+c_arrow+"</div>";
	            $(ops.get).html(s);
	            set();
	        }
	        function set()
	        {

	            ops.ob=$(ops.get+' .vgallery');
	            ops.ob_ul=$('>ul',ops.ob);
	            ops.ob_li=$('>ul>li',ops.ob);
	            ops.ob_ctr_next=$('>ul>.controls>.ctr_next',ops.ob);
	            ops.ob_ctr_preview=$('ul>.controls>.ctr_preview',ops.ob);
	            ops.ob_arrow=$('>.ctr_arrows>.arrows>.arrow',ops.ob);
	            if(ops.per)
	            {
	            w_resize();
	            }
	            a_ef(ops.cur);
	            listing();
	            if(ops.auto)settimer(1);
	        }
	        function w_resize()
	        {
	            var w=$(ops.ob_ul).width();
	            $(ops.ob_ul).css({'height':w+'px'});
	        }
	        function a_ef(num)
	        {
				if (cthis.round[ops.cur] != undefined) {
					ops.cur=num;
					cthis.call('current',num);
					var m=[cthis.round[ops.cur].prev,cthis.round[ops.cur].current,cthis.round[ops.cur].next];
					var n=['b','c','e'];
					for(var i=0;i<n.length;i++)$(ops.ob_li).removeClass(n[i]);
					for(var i=0;i<n.length;i++)$(ops.ob_li).eq(m[i]).addClass(n[i]);
					$('.c').trigger('zoom.destroy').zoom({ touch: false, onZoomIn: true, onZoomOut: true });
					$('.youtube-iframe').each(function(index) {
						this.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
					});
				}
	        }
	        function listing()
	        {
	            if(ops.auto)
	            {
	                $(ops.ob).bind('mouseenter',function(){
	                    settimer(0);
	                });
	                $(ops.ob).bind('mouseleave',function(){
	                    settimer(1);
	                });
	            }
	            var bnext=function(){
	                a_ef(cthis.round[ops.cur].next);
	            };
	            var bprev=function(){
	                a_ef(cthis.round[ops.cur].prev);
	            };
	            var bview=function(s){a_ef(s);};
	            $(ops.ob_ctr_next).bind('click',function(){bnext();});
	            $(ops.ob_ctr_preview).bind('click',function(){bprev();});
	            $(ops.ob_arrow).bind('click',function(){
	                var inx=$(ops.ob_arrow).index(this);
	                a_ef(inx);
	            });

	            cthis.function_view=bview;
	            cthis.function_next=bnext;
	            cthis.function_preview=bprev;

	            if(ops.per)
	            {
	                $(window).resize(function(){
	                    w_resize();
	                });
	            }
	        }
	        function settimer(x)
	        {
	            if(x)ops.timerun=setInterval(function(){a_ef(cthis.round[ops.cur].next)},ops.time);
	            else clearInterval(ops.timerun);
	        }
	    }
	    this.addscrollRun=function(ops)
	    {
	        var dfs={'get':'','ul':'','li':'','count':4,'current':-1,'auto':false,'per':''};
	        var cthis=this;
	        ops=$.extend({},dfs,ops);
	        ops.ob=$(ops.get);

	        var s=$(ops.ob).html();
	        $(ops.ob).html("<div class='vscrolls_viewer'>"+s+"</div>");

	        s='>.vscrolls_viewer ';
	        ops.obs=$(s,ops.ob);
	        ops.ob_ul=$(s+ops.ul,ops.ob);
	        ops.ob_e=$(ops.li,ops.ob_ul);
	        ops.s=$(ops.ob_e).size();
	        if(!cthis.round[ops.current])ops.current=0;
	        ops.hi=$(ops.ob_e).height();
	        get_size();
	        ops.ob_ul.prepend("<div style='clear:both;'></div>");
	        ops.ob_ul.append("<div style='clear:both;'></div>");
	        ops.ob.append("<div class='vscroll_control'><span class='ctr ctr_next'></span><span class='ctr ctr_preview'></span></div>");
	        $(ops.ob_e).css({'float':'left'});

	        $(ops.ob).addClass('vscroll_viewer');
	        $(ops.ob_ul).addClass('vscroll_ul');

	        $(ops.ob_e).addClass('vscroll_li');


	        //ops.w=$(ops.ob_e).eq(0).width();
	        $(ops.ob).css({'position':'relative'});
	        $(ops.obs).css({'overflow':'hidden','position':'relative','height':'100%'});
	        $(ops.ob_ul).css({'position':'absolute','display':'block','top':'0px','left':(-ops.current*ops.w)+'px'});

	        list();
	        if(ops.current>-1)ar(ops.current);
	        function get_size()
	        {

		        ops.wi=$(ops.obs).width();
		        ops.w=ops.wi/ops.count;
		        $(ops.ob_e).css({'width':(ops.w)+'px'});
		        $(ops.ob_ul).css({width:(ops.w*ops.s)+'px'});
	            if(ops.per)
	            {
	                ops.hi=ops.wi/ops.per;
	                var cc={'height':ops.hi+ 22 +'px'};
		            $(ops.ob).css(cc);
		            $(ops.ob_ul).css(cc);
		            $(ops.ob_e).css(cc);
	            }
	        }
	        function ar(num)
	        {
	            ops.current=num;
	            $(ops.ob_e).removeClass('selected');
	            $(ops.ob_e).eq(num).addClass('selected');
	            var pp=0;
	            if(ops.center)pp=(ops.wi-ops.w)/2;
	            $(ops.ob_ul).css({'left':(-ops.current*ops.w+pp)+'px'});
	            $('.vgallery_normal .vgallery_repalce').html('').removeClass('view');
	        }
	        var bond=function(s)
	        {
	            //$(ops.ob_e).eq(s).trigger('click');
	            cthis.function_view(s);
	        }
	        function list()
	        {
	            var b=function(s)
	            {
	                ar(s);
	            }
	            cthis.addcall('current',b);
	            $(ops.ob_e).bind('click',function(){
	                var inx=$(ops.ob_e).index(this);
	                bond(inx);
	                cthis.call('scroll_arrow',inx);
	            })
	            $('>.vscroll_control>.ctr_next',ops.ob).bind('click',function(){
	                bond(cthis.round[ops.current].next);
	            });
	            $('>.vscroll_control>.ctr_preview',ops.ob).bind('click',function(){
	                bond(cthis.round[ops.current].prev);
	            });
                $(window).resize(function(){
                    get_size();
                });

	        }

	    }
	    this.addPopview=function(ops)
	    {
	    	var dfs={'width':'80%','height':'80%','view_slide':true,cur:0,'time':400,'center':true};
	    	ops=$.extend({},dfs,ops);
	    	ops.map={'di':{},'ve':{},'round':{}};ops.stt=0;
	    	var cthis=this;
	    	set();
	    	//view(1);
	    	list();

	        function set()
	        {
	        	if($('.'+container_div+'.vgallery_popup').length >0) $('.'+container_div+'.vgallery_popup').remove();
	            var s="<div class='"+container_div+" vgallery_popup'><table><tbody><tr><td><div class='aclose'></div><div class='acontent'><div class='abackground'></div><div class='bcontent'></div><div class='bclose'></div></div></td></tr></tbody></table></div>";
	            $('body').append(s);
	            ops.ob=$('.'+container_div+'.vgallery_popup');
	            ops.ob_ccontent=$('>table>tbody>tr>td>.acontent',ops.ob);
	            ops.ob_content=$('>table>tbody>tr>td>.acontent>.bcontent',ops.ob);
	            $(ops.ob_ccontent).css({'width':ops.width,'height':ops.height});
	            if(ops.view_slide)draw_slide();

	        }
	        function aview(pp)
	        {
	            return "<li><span class='thumbbsd' data='"+pp.stt+"'>"+pp.u_thumbnail+"</span></li>";
	        }
	        function draw_slide()
	        {
	            var s1='',s2='';

	            for(var i=0;i<cthis.data.length;i++)
	            {

	                if(cthis.data[i].type)
	                s1+=aview(cthis.data[i])
	                else
	                s2+=aview(cthis.data[i]);
	            }
	            if(s1)s1="<div class='noidung_1'><h2></h2><ul>"+s1+"</ul></div>";
	            if(s2)s2="<div class='noidung_2'><h2></h2><ul>"+s2+"</ul></div>";
	            var s="<div class='content_slide'><div class='box1'><div class='cta_slide'><table class='cta_slide_table'><tbody><tr><td><div class='ctb_slide'></div></td></tr></tbody></table><div class='ctrs'><span class='ctr ctr_next'></span><span class='ctr ctr_preview'></span></div></div></div><div class='box2'>"+s1+s2+"</div></div>";
	            $(ops.ob_content).append(s);
	            ops.ob_sct=$('.box1>.cta_slide .ctb_slide');
	            ops.ob_e=$('.thumbbsd',ops.ob);
	            var i=-1;
	            $.each(ops.ob_e,function(){
	                i++;
	                var v=$(this).attr('data');
	                ops.map.di[i]=v;
	                ops.map.ve[v]=i;

	            })
	            ar(ops.cur);
	        }
	        function view(s)
	        {
	            if(s)$(ops.ob).addClass('view');
	            else
	                {
	                    $(ops.ob).removeClass('view');
	                    ar(-1);
	                }

	        }
	        function calc(num)
	        {
	            if(!num)num=ops.cur;
	            return $(ops.ob_e).attr('data');
	        }
	        function ar(num)
	        {
	            if(num==-1)
	            {
		            $(ops.ob_sct).html('');
		        }
		        else
		        {
					if (cthis.data[num] != undefined) {
						ops.cur=num;
						ops.current=ops.map.ve[ops.cur];

						$(ops.ob_e).removeClass('ss');
						$(ops.ob_e).eq(ops.map.ve[ops.cur]).addClass('ss');
						//$(".thumbbsd[data='"+ops.cur+"']").addClass('ss');
						$(ops.ob_sct).animate({'opacity':0},ops.time/2,function(){
							$(ops.ob_sct).html(cthis.data[num].u_content);
							$(ops.ob_sct).animate({'opacity':1},ops.time/2);
							$(ops.ob_sct).trigger('zoom.destroy').zoom({ touch: false, onZoomIn: true, onZoomOut: true });
						});
					}
	            }
	        }
	        function list()
	        {
	            var b=function(s)
	            {
	                view(1);
	                ar(s);
	            }
	            cthis.addcall('scroll_arrow',b);

	            $('>table>tbody>tr>td>.aclose',ops.ob).bind('click',function(){view();});
	            $('>.bclose',ops.ob_ccontent).bind('click',function(){view();});
	            $('.ctrs .ctr_next',ops.ob).bind('click',function(e){

					if(ops.current > ops.ob.length) ops.current = ops.cur;

	                var s=cthis.round[ops.current].next;
	                ar(ops.map.di[s]);
	                e.preventDefault();
	            })
	            $('.ctrs .ctr_preview',ops.ob).bind('click',function(e){
	            	if(ops.current > ops.ob.length) ops.current = ops.cur;
	                var s=cthis.round[ops.current].prev;
	                ar(ops.map.di[s]);
	                e.preventDefault();
	            })
	            $(ops.ob_e).bind('click',function(){
	                var inx=$(this).attr('data');
	                ar(inx);
	            })
	        }
	    }
	}

}
