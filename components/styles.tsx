import styled from 'styled-components'

export const Container = styled.div`
  padding: 25px;
  background: #f9f9f9;
  #add_item {
    #add_instance {
      button {
        padding: 8px 10px;
        background: #400ff2;
        border: none;
        border-radius: 4px;
        color: #fff;
        display: flex;
        margin: 4px;
        align-items: center;
      }
    }
    button#bg_red {
      background: #400ff2;
      border: none;
      color: #fff;
      padding: 6px 15px;
      font-size: 14px;
      font-weight: 700;
      outline: none !important;
      &:disabled {
        opacity: 0.5;
      }
    }
    button#outline_red {
      background: none;
      border: 2px solid #400ff2;
      color: #400ff2;
      padding: 6px 15px;
      font-size: 14px;
      font-weight: 700;
      outline: none !important;
    }
    form {
      padding: 25px;
      border: 1px dashed #c9c9c9;
    }
  }
  #list_city {
    display: flex;
    flex-wrap: wrap;
    .item {
      margin: 4px;
      padding: 8px 10px;
      background: #400ff2;
      border-radius: 4px;
      color: #fff;
      display: flex;
      align-items: center;
      p {
        margin: 0px;
      }
      button {
        margin-left: 10px;
        width: 24px;
        height: 24px;
        border: none;
        background: rgba(0, 0, 0, 0.2);
        color: #fff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  #list {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    &.grided {
      grid-template-columns: 1fr 1fr;
    }
    .accordion {
      padding: 12px;
      background: #f0f0f0;
      border: 1px solid #c9c9c9;
      position: relative;
      .summary {
        button {
          background: none;
          border: none;
          font-size: 14px;
        }
        h4 {
          font-weight: 700;
          color: #666;
          font-size: 18px;
        }
        p {
          color: #888;
          margin: 0px;
          font-size: 12px;
        }
        span {
          padding: 5px 10px;
          background: #400ff2;
          color: #fff;
          display: block;
          position: absolute;
          top: -15px;
          right: -15px;
          font-size: 12px;
        }
      }
      .detail {
        overflow: hidden;
        transition: 350ms;
        background: #fefefe;
        height: 0px;
        padding: 0px;
        &.expanded {
          margin-top: 10px;
          padding: 10px;
          height: 100%;
        }
        div.row {
          .head_detail {
            border-bottom: 1px solid #eee;
            padding: 10px;
            background: #f9f9f9;
            button {
              width: 22px;
              height: 22px;
              border: none;
              border-radius: 50%;
              background: #400ff2;
              color: #fff;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
    }
    .item {
      padding: 12px;
      background: #f0f0f0;
      border: 1px solid #c9c9c9;
      position: relative;
      button {
        background: none;
        border: none;
        font-size: 14px;
      }
      h4 {
        font-weight: 700;
        color: #666;
        font-size: 18px;
      }
      p {
        color: #888;
        margin: 0px;
        font-size: 12px;
      }
      span {
        padding: 5px 10px;
        background: #400ff2;
        color: #fff;
        display: block;
        position: absolute;
        top: -15px;
        right: -15px;
        font-size: 12px;
      }
    }
  }
  #grid_form {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 20px;
    form {
      padding: 25px;
      border: 1px solid #c9c9c9;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }
  }
`
