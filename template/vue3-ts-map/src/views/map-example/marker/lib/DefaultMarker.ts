import { addMarker } from '@/hooks/useMap';
import gantryIcon from '@/assets/images/map/gantry.png';

type ExtData = {
  name: string;
};

/**
 * 添加默认点标记
 */
class DefaultMarker {
  private marker: AMap.Marker | null = null;
  private map: AMap.Map | undefined;
  private position: AMap.LngLatLike = [118.811836, 32.051376];

  markerClickHandler(_: AMap.MarkerEvent<ExtData>, extData: ExtData) {
    $message.success(`点击了${extData.name}`);
  }
  /**
   * @function
   * @description 添加url图标
   **/
  addByUrlIcon(map: AMap.Map | undefined) {
    this.map = map;
    this.clearMarker();
    this.marker = addMarker(
      {
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        offset: new AMap.Pixel(-13, -30),
        position: this.position,
        title: '点标记',
        map, // 不加则需要map.add(marker)
        extData: { name: '点标记' },
      },
      this.markerClickHandler
    );
  }
  /**
   * @function
   * @description 更新url图标
   **/
  updateUrlIcon() {
    if (!this.marker) return $message.warning('请先添加点标记');
    this.marker.setIcon('//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png');
  }

  /**
   * @function
   * @description 添加本地图标
   **/
  addByLocalIcon(map: AMap.Map | undefined) {
    this.map = map;
    this.clearMarker();
    this.marker = addMarker(
      {
        icon: gantryIcon,
        offset: new AMap.Pixel(-13, -30),
        position: this.position,
        title: '点标记',
        map, // 不加则需要map.add(marker)
        extData: { name: '点标记' },
      },
      this.markerClickHandler
    );
  }

  /**
   * @function
   * @description 添加自定义内容marker
   **/
  addByContent(map: AMap.Map | undefined) {
    this.clearMarker();
    // 点标记显示内容，HTML要素字符串
    const markerContent = `
      <div class="custom-content-marker">
        <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png">
      </div>`;
    this.marker = addMarker(
      {
        content: markerContent,
        position: this.position,
        title: '点标记',
        map, // 不加则需要map.add(marker)
        extData: { name: '点标记' },
      },
      this.markerClickHandler
    );
  }

  /**
   * @function
   * @description 修改图标尺寸
   **/
  updateIconSize() {
    if (!this.marker) return $message.warning('请先添加点标记');
    const icon = new AMap.Icon({
      image: gantryIcon,
      size: new AMap.Size(52, 68), // 图标尺寸
      imageSize: new AMap.Size(52, 68), // 根据所设置的大小拉伸或压缩图片
    });
    this.marker.setIcon(icon);
  }

  updateContent() {
    if (!this.marker) return $message.warning('请先添加点标记');
    this.marker.setContent(
      `<div class="custom-content-marker">
        <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png" />
        <span class='marker-content'>更新点标记内容</span>
       </div>`
    );
  }

  clearMarker() {
    if (this.marker) {
      this.marker.setMap(null);
      this.marker = null;
    }
  }

  removeMarker() {
    if (this.map && this.marker) {
      this.map.remove(this.marker);
    }
  }
}
export const defaultMarker = new DefaultMarker();
export default DefaultMarker;
