Feature: Greeting

  Scenario: Say hello
  Given a login to ecommerce application with "username" and "password"
    When the greeter says hello
    Then I should have heard "hello"