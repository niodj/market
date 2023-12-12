
import { Time } from "./Time";
import s from "./TopMenu.module.css"
export const TopMenu = () => {

    return (
      <>
            <div className={s.wrapper}>
                <Time />
        </div>
      </>
    );
}