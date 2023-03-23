## 트러블 슈팅

- 옵저버를 사용해 새로운 데이터 요청을 했다.
- susepense의 기능을 사용했는데, useQuery가 새로운 데이터를 요청할때마다 callback이 호출 됐다.
- 이는 사용자 경험에 매주 좋지 않아, 이전의 데이터가 보이는 상태에서 요청이 완료된다면 새로운 데이터를 렌더링 하고 싶었다.
- 리액트 훅에는 useDeferredValue 훅이 존재한다. 이는 리액트 18버전에 나온 것으로 우선순위를 뒤로 미뤄
- 메모리에 이전의 값을 저장해 두고, 이전의 값을 화면에 계속 보여주다가 새로운 값의 변경이 완료된다면 새로 렌더링을 하게 된다.
- 이 훅을 사용하여 react Query의 키값을 useDeferredValue에 저장해 두고 query의 키값으로 사용했다.
- 이제는 새로운 데이터의 요청이 있을때마다 fallback이 호출되는 문제는 발생하지 않았다.

```js
const [token, setToken] = useState('');
const deferredToken = useDeferredValue(token);
const { data } = useQuery(['videos', id, deferredToken], () => {
  return fetch(
    `https://www.youtube.com/videos?videoId=${id}&pageToken=${deferredToken}`
  ).then((res) => res.json());
});
```
